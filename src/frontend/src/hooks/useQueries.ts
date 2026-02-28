import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Course, Testimonial } from "../backend.d.ts";
import { useActor } from "./useActor";

// Category enum values matching backend.d.ts
export enum Category {
  ai = "ai",
  formation = "formation",
  education = "education",
}

export type { Course, Testimonial };

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCoursesByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCoursesByCategory(
        category as unknown as import("../backend.d.ts").Category,
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribeToNewsletter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.subscribeToNewsletter(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });
}
