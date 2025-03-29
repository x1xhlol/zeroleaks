import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="min-h-screen pt-20 relative">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Skeleton className="h-10 w-32 mb-6" />

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>

          <div className="space-y-8">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

