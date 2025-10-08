"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema, FormData } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      link: "",
      pitch: "",
    },
    reValidateMode: "onBlur",
  });

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const result = await createPitch(formData);

      if (result.status === "ERROR") throw new Error();
      console.log(result);

      if (result.status === "SUCCESS") {
        toast.success("Startup idea created successfully", {
          description: "Your startup was successfully submitted",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch {
      toast.error("Error", {
        description: "Please check your inputs and try again",
      });
    }
  };

  // const [state, formAction, isPending] = useActionState(handleFormSubmit, {
  //   error: "",
  //   status: "INITIAL",
  // });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          {...register("title")}
          id="title"
          name="title"
          required
          placeholder="Startup Title"
          className="startup-form_input"
        />
        {errors.title && (
          <p className="startup-form_error">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          {...register("description")}
          id="description"
          name="description"
          required
          placeholder="Startup Description"
          className="startup-form_textarea"
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          {...register("category")}
          id="category"
          name="category"
          required
          placeholder="Startup Category (Tech, Health, Eductaion...)"
          className="startup-form_input"
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image Url
        </label>
        <Input
          {...register("link")}
          id="link"
          name="link"
          required
          placeholder="Startup Image Url"
          className="startup-form_input"
        />
        {errors.link && (
          <p className="startup-form_error">{errors.link.message}</p>
        )}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={watch("pitch")}
          onChange={(value) => {
            setValue("pitch", value || "");
          }}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && (
          <p className="startup-form_error">{errors.pitch.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white "
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : " Submit your startup"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
