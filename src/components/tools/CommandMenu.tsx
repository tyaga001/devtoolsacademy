'use client';
import React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useRouter, useSearchParams } from "next/navigation";
import { Tool } from "@/app/tools/data";
import { Button } from "@/components/ui/button";
import { Laptop, Github, ExternalLink } from "lucide-react";

interface CommandMenuProps {
  tools: Tool[];
  categories: string[];
  licenses: string[];
  trigger?: React.ReactNode;
}

export function CommandMenu({ tools, categories, licenses, trigger }: CommandMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (value: string) => {
    setOpen(false);

    const [action, id] = value.split(":");
    const params = new URLSearchParams(searchParams);

    switch (action) {
      case "tool":
        router.push(`/tools/${id}`);
        break;
      case "category":
        params.append("categories", id);
        router.push(`?${params.toString()}`);
        break;
      case "license":
        params.append("licenses", id);
        router.push(`?${params.toString()}`);
        break;
      case "clear":
        router.push("");
        break;
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-start text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <span className="hidden md:inline-flex items-center">
            Press{" "}
            <kbd className="pointer-events-none ml-2 mr-1 font-mono">⌘</kbd>
            <kbd className="pointer-events-none font-mono">K</kbd>
          </span>
          <span className="md:hidden">Search...</span>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all tools and filters..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Tools">
            {tools.map((tool) => (
              <CommandItem
                key={tool.id}
                value={`tool:${tool.id}`}
                onSelect={handleSelect}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>{tool.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    asChild
                  >
                    <a
                      href={tool.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    asChild
                  >
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categories">
            {categories.map((category) => (
              <CommandItem
                key={category}
                value={`category:${category}`}
                onSelect={handleSelect}
              >
                {category}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Licenses">
            {licenses.map((license) => (
              <CommandItem
                key={license}
                value={`license:${license}`}
                onSelect={handleSelect}
              >
                {license}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="clear" onSelect={handleSelect}>
              Clear all filters
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}