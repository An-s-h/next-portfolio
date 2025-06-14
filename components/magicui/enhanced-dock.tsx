"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { motion, type MotionProps, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react"
import React, { type PropsWithChildren, useRef } from "react"

import { cn } from "@/lib/utils"

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  orientation?: "horizontal" | "vertical"
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 flex items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md shadow-lg",
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      orientation = "horizontal",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
    const mouseY = useMotionValue(Number.POSITIVE_INFINITY)

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            mouseY: mouseY,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
            orientation: orientation,
          })
        }
        return child
      })
    }

    const isVertical = orientation === "vertical"

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (isVertical) {
            mouseY.set(e.pageY)
          } else {
            mouseX.set(e.pageX)
          }
        }}
        onMouseLeave={() => {
          if (isVertical) {
            mouseY.set(Number.POSITIVE_INFINITY)
          } else {
            mouseX.set(Number.POSITIVE_INFINITY)
          }
        }}
        {...props}
        className={cn(
          dockVariants({ className }),
          isVertical ? "flex-col h-max w-[58px]" : "flex-row h-[58px] w-max mx-auto mt-8",
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          },
        )}
      >
        {renderChildren()}
      </motion.div>
    )
  },
)

Dock.displayName = "Dock"

export interface DockIconProps extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: MotionValue<number>
  mouseY?: MotionValue<number>
  orientation?: "horizontal" | "vertical"
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  mouseY,
  orientation = "horizontal",
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const defaultMouseY = useMotionValue(Number.POSITIVE_INFINITY)

  const isVertical = orientation === "vertical"
  const mousePosition = isVertical ? (mouseY ?? defaultMouseY) : (mouseX ?? defaultMouseX)

  const distanceCalc = useTransform(mousePosition, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 }
    if (isVertical) {
      return val - bounds.y - bounds.height / 2
    } else {
      return val - bounds.x - bounds.width / 2
    }
  })

  const sizeTransform = useTransform(distanceCalc, [-distance, 0, distance], [size, magnification, size])

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  // Enhanced hover animations
  const backgroundOpacity = useTransform(distanceCalc, [-distance, 0, distance], [0.1, 0.25, 0.1])
  const borderOpacity = useTransform(distanceCalc, [-distance, 0, distance], [0.2, 0.4, 0.2])
  const shadowBlur = useTransform(distanceCalc, [-distance, 0, distance], [4, 12, 4])
  const shadowOpacity = useTransform(distanceCalc, [-distance, 0, distance], [0.1, 0.3, 0.1])

  const animatedBackgroundOpacity = useSpring(backgroundOpacity, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  })

  const animatedBorderOpacity = useSpring(borderOpacity, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  })

  const animatedShadowBlur = useSpring(shadowBlur, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  })

  const animatedShadowOpacity = useSpring(shadowOpacity, {
    mass: 0.1,
    stiffness: 200,
    damping: 15,
  })

  return (
    <motion.div
      ref={ref}
      style={{
        width: scaleSize,
        height: scaleSize,
        padding,
        backgroundColor: `rgba(255, 255, 255, ${animatedBackgroundOpacity.get()})`,
        borderColor: `rgba(255, 255, 255, ${animatedBorderOpacity.get()})`,
        boxShadow: `0 ${animatedShadowBlur.get()}px ${animatedShadowBlur.get() * 2}px rgba(0, 0, 0, ${animatedShadowOpacity.get()})`,
      }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full border border-transparent transition-all duration-200 ease-out",
        "hover:bg-white/20 dark:hover:bg-white/15",
        "hover:border-white/30 dark:hover:border-white/25",
        "hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-black/40",
        "active:scale-95 active:transition-transform active:duration-75",
        className,
      )}
      whileHover={{
        y: isVertical ? 0 : -2,
        x: isVertical ? -2 : 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      {...props}
    >
      <motion.div
        className="flex items-center justify-center w-full h-full"
        whileHover={{
          scale: 1.1,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
