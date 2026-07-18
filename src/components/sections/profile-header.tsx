import Image from "next/image"
import { DATA } from "@/data/resume"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-line">
      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top sm:mt-auto shrink-0 border-r border-line">
          <div className="mx-0.5 my-0.75 flex size-18 items-center justify-center border border-line sm:size-20">
            <Image
              src={DATA.avatarUrl}
              alt={DATA.name}
              width={160}
              height={160}
              className="size-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
              {DATA.name}
            </h1>
          </div>

          <div className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            <p className="text-sm text-muted-foreground">
              {DATA.description["en"]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
