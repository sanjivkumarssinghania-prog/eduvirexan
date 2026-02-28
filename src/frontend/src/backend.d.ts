import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: bigint;
    name: string;
    role: string;
    message: string;
    rating: bigint;
}
export interface Course {
    id: bigint;
    title: string;
    createdAt: bigint;
    tags: Array<string>;
    description: string;
    category: Category;
}
export enum Category {
    ai = "ai",
    formation = "formation",
    education = "education"
}
export interface backendInterface {
    getAllCourses(): Promise<Array<Course>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getCoursesByCategory(category: Category): Promise<Array<Course>>;
    subscribeToNewsletter(email: string): Promise<void>;
}
