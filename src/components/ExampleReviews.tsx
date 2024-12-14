import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const exampleReviews = [
  {
    text: "Amazing service! The staff was incredibly friendly and professional. Would definitely recommend to anyone looking for top-notch quality.",
    author: "Sarah M.",
    rating: 5,
  },
  {
    text: "Outstanding experience from start to finish. The attention to detail and customer service exceeded my expectations.",
    author: "John D.",
    rating: 5,
  },
  {
    text: "Very impressed with the quality of service. The team went above and beyond to ensure everything was perfect.",
    author: "Michael R.",
    rating: 5,
  },
  {
    text: "Fantastic experience! The level of professionalism and expertise was exceptional. Will definitely be coming back.",
    author: "Emily W.",
    rating: 5,
  },
];

export const ExampleReviews = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">What Our Customers Say</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {exampleReviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="glass-card h-full p-6 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                  <p className="font-semibold">{review.author}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};