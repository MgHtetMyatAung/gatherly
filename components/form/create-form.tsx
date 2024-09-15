"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalize } from "@/lib/helper";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  start_date: z.date({
    required_error: "Start date is required",
  }),
  end_date: z.date({
    required_error: "End date is required",
  }),
  event_type: z.enum(["physical", "online"]),
  location: z.string().max(255).optional(),
  plaform: z.string().max(255).optional(),
  image: z.instanceof(File).refine((file) => file.size <= 2048 * 1024, "File size should be less than 2MB"),
  category_id: z.number().min(1, "Category is required"),
  org_name: z.string().max(255),
  org_email: z.string().email("Invalid email address").max(255),
  org_phone: z.string().max(255),
  org_logo: z.instanceof(File).refine((file) => file.size <= 2048 * 1024, "File size should be less than 2MB").optional(),
  has_limit: z.boolean(),
  limit: z.number().int().optional(),
}).refine(data => {
  if (data.event_type === "physical") {
    return !!data.location;
  } else {
    return !!data.plaform;
  }
}, {
  message: "Location is required for physical events, platform is required for online events",
  path: ["location", "platform"],
}).refine(data => {
  if (data.has_limit) {
    return !!data.limit;
  }
  return true;
}, {
  message: "Limit is required when 'Has Limit' is enabled",
  path: ["limit"],
});

type FormData = z.infer<typeof schema>;

type Category = {
  id: string;
  name: string;
};

export default function CreateForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      start_date: undefined,
      end_date: undefined,
      event_type: "physical",
      location: "",
      plaform: "",
      image: undefined,
      category_id: undefined,
      org_name: "",
      org_email: "",
      org_phone: "",
      org_logo: undefined,
      has_limit: false,
      limit: undefined,
    },
  });


  const onSubmit = async (data: FormData) => {
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
        const { title, description, image, start_date, end_date, org_name, org_email, org_phone, org_logo, category_id, limit, location, plaform } = data

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('start_date', start_date.toISOString().split('T')[0]);
        formData.append('end_date', end_date.toISOString().split('T')[0]);
        formData.append('org_name', org_name);
        formData.append('org_email', org_email);
        formData.append('org_phone', org_phone);
        formData.append('category_id', category_id!.toString());
        if (limit) formData.append('limit', limit.toString());
        if (location) formData.append('location', location);
        if (plaform) formData.append('plaform', plaform);

        if (image instanceof File) {
          formData.append('image', image);
        }

        if (org_logo instanceof File) {
          formData.append('org_logo', org_logo);
        }

        const response = await api.post("/event/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

      if (response.status === 201) {
        router.push("/my-events");
      } else {
        setError("Failed to create event. Please try again.");
      }
    } catch (error) {
    console.error(error)
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Event description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal dark:bg-transparent dark:hover:bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value && (
                        format(field.value, "PPP")
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal dark:bg-transparent dark:hover:bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value && (
                        format(field.value, "PPP")
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch("event_type") === "physical" && (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Physical event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {form.watch("event_type") === "online" && (
          <FormField
            control={form.control}
            name="plaform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <FormControl>
                  <Input placeholder="Online event platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <div 
                  className="aspect-video h-full flex flex-col justify-center items-center border border-neutral-800 rounded-lg overflow-hidden relative group cursor-pointer"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  {value instanceof File ? (
                    <>
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Event preview"
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white hover:text-neutral-200 transition-colors duration-300">
                          Choose new image
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image className="w-6 h-6 text-neutral-500 mb-2" />
                      <span className="text-neutral-500 hover:text-neutral-400">
                        Choose an image
                      </span>
                    </>
                  )}
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...field}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {capitalize(category.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="org@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="org_logo"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Organization Logo</FormLabel>
              <FormControl>
                <div 
                  className="aspect-square w-64 h-full flex flex-col justify-center items-center border border-neutral-800 rounded-lg overflow-hidden relative group cursor-pointer"
                  onClick={() => document.getElementById('org-image-upload')?.click()}
                >
                  {value instanceof File ? (
                    <>
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Organization preview"
                        className="max-h-full max-w-full object-contain"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white hover:text-neutral-200 transition-colors duration-300">
                          Choose new image
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Image className="w-6 h-6 text-neutral-500 mb-2" />
                      <span className="text-neutral-500 hover:text-neutral-400">
                        Choose an image
                      </span>
                    </>
                  )}
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
                    }}
                    {...field}
                    className="hidden"
                    id="org-image-upload"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_limit"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Limit Attendees
                </FormLabel>
                <FormDescription>
                  Set a maximum number of attendees for this event
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
              <FormItem
              className={cn({"hidden": !form.watch("has_limit")})}
              >
              <FormLabel>Attendee Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  disabled={!form.watch("has_limit")}
                />
              </FormControl>
              <FormDescription>
                Maximum number of attendees allowed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Admin will check your event <br/>
            Your event will confirm when Admin Accept
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isLoading || !termsAccepted}>
          {isLoading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </Form>
  );
}


