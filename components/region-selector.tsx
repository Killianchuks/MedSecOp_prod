"use client"

import { useState } from "react"
import { useRegion, regions } from "@/contexts/region-context"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function RegionSelector() {
  const { currentRegion, setCurrentRegion, isLoading } = useRegion()
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 animate-pulse" />
              <span>Detecting region...</span>
            </div>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              {currentRegion.name}
            </>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search region..." />
          <CommandList>
            <CommandEmpty>No region found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(regions).map(([code, region]) => (
                <CommandItem
                  key={code}
                  value={region.name}
                  onSelect={() => {
                    setCurrentRegion(region)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", currentRegion.code === code ? "opacity-100" : "opacity-0")} />
                  {region.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

