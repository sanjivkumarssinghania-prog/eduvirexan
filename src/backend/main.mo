import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type Category = {
    #education;
    #formation;
    #ai;
  };

  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    category : Category;
    tags : [Text];
    createdAt : Int;
  };

  module Course {
    public func compareById(a : Course, b : Course) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Testimonial = {
    id : Nat;
    name : Text;
    role : Text;
    message : Text;
    rating : Nat;
  };

  module Testimonial {
    public func compareById(a : Testimonial, b : Testimonial) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  let courses = Map.empty<Nat, Course>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let newsletterSubscribers = List.empty<Text>();

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray().sort(Course.compareById);
  };

  public query ({ caller }) func getCoursesByCategory(category : Category) : async [Course] {
    courses.values().toArray().filter(
      func(course) {
        course.category == category;
      }
    ).sort(Course.compareById);
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort(Testimonial.compareById);
  };

  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async () {
    if (newsletterSubscribers.any(func(subscriberEmail) { subscriberEmail == email })) {
      Runtime.trap("Already subscribed");
    };
    newsletterSubscribers.add(email);
  };
};
