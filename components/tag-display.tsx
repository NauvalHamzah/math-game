"use client"

import { useEffect, useRef, useState } from "react"

export default function TagDisplay({ filter, tags }: { filter: string, tags: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const hiddenRef = useRef<HTMLDivElement>(null)

    const [visibleTags, setVisibleTags] = useState<string[]>([])
    const [hiddenCount, setHiddenCount] = useState(0)

    useEffect(() => {
        const measure = () => {
            const container = containerRef.current
            const hidden = hiddenRef.current
            if (!container || !hidden) return

            const containerWidth = container.offsetWidth
            const tagElements = Array.from(hidden.children) as HTMLSpanElement[]

            const BUFFER_WIDTH = 40 // Reserve extra space to avoid wrapping
            let totalWidth = 0
            let count = 0

            for (let i = 0; i < tagElements.length; i++) {
                const tagWidth = tagElements[i].offsetWidth + 8 // +gap
                if (totalWidth + tagWidth + BUFFER_WIDTH <= containerWidth) {
                    totalWidth += tagWidth
                    count++
                } else {
                    break
                }
            }

            setVisibleTags(tags.slice(0, count))
            setHiddenCount(tags.length - count)
        }

        requestAnimationFrame(measure)
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [tags])

    return (
        <div className="relative w-full">
            {/* Tag container with right-aligned counter */}
            <div
                ref={containerRef}
                className="flex flex-nowrap items-center gap-1 overflow-hidden w-full"
            >
                <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                    {visibleTags.map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs font-medium px-2 py-1 rounded-full truncate max-w-full
                                ${filter === "category"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {hiddenCount > 0 && (
                    <span  className={`text-xs font-medium px-2 py-1 rounded-full truncate max-w-full
                                ${filter === "category"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                    >
                        ..+{hiddenCount}
                    </span>
                )}
            </div>

            {/* Hidden measuring container */}
            <div
                ref={hiddenRef}
                className="absolute invisible z-[-1] pointer-events-none left-0 top-0 flex gap-1 flex-wrap"
            >
                {tags.map((tag) => (
                    <span
                        key={tag}
                         className={`text-xs font-medium px-2 py-1 rounded-full truncate max-w-full
                                ${filter === "category"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}
