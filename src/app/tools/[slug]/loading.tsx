export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-start justify-start pt-16 lg:px-72">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-4 rounded-lg">
            <div className=" size-12  animate-pulse rounded-xl bg-[#141414]"></div>
            <div className=" h-8  w-32 animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
          <div>
            <div className=" h-8  w-full animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
          <div className="flex flex-col gap-6 pt-10 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
              <div className="flex w-full items-center gap-4 rounded-lg">
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
              <div className="flex w-full items-center gap-4 rounded-lg">
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
                <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pt-20">
            <div className=" h-8  w-1/2 animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
          <div className="flex w-full items-center gap-4 rounded-lg">
            <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
            <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
            <div className=" h-6  w-20 animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 rounded-lg md:flex-row">
            <div className=" h-20  w-full animate-pulse rounded-xl bg-[#141414] md:w-1/3"></div>
            <div className=" h-20  w-full animate-pulse rounded-xl bg-[#141414] md:w-1/3"></div>
            <div className=" h-20  w-full animate-pulse rounded-xl bg-[#141414] md:w-1/3"></div>
          </div>
          <div className="pb-6 pt-20">
            <div className=" h-8  w-56 animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className=" h-4  w-full animate-pulse rounded-xl bg-[#141414]"></div>
            <div className="h-4  w-full animate-pulse rounded-xl bg-[#141414]"></div>
            <div className=" h-4  w-full animate-pulse rounded-xl bg-[#141414]"></div>
            <div className=" h-4  w-full animate-pulse rounded-xl bg-[#141414]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
