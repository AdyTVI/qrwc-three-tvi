"use client"

import { useState, ReactNode } from "react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LuHouse,
  LuMusic,
  LuVideo,
  LuMenu,
  LuInfo,
  LuMapPin,
  LuDoorClosed,
  LuChevronDown,
  LuChevronRight
} from "react-icons/lu"

type MenuItem = {
  id: string
  title: string
  icon?: ReactNode
  path?: string
  children?: MenuItem[]
}

const menuGroups: { label: string; items: MenuItem[] }[] = [
  {
    label: "MONITORING",
    items: [
      {
        id: "sites",
        title: "Sites",
        icon: <LuMapPin size={20} />,
        children: [
          {
            id: "holland-village",
            title: "Holland Village",
            children: [
              {
                id: "rooms",
                title: "Rooms",
                icon: <LuDoorClosed size={20} />,
                children: [
                  {
                    id: "townhall",
                    title: "Townhall",
                    children: [
                      {
                        id: "status-townhall",
                        title: "Status",
                        icon: <LuInfo size={20} />,
                        path: "/status/townhall"
                      }
                    ]
                  },
                  {
                    id: "medium",
                    title: "Medium",
                    children: [
                      {
                        id: "status-medium",
                        title: "Status",
                        icon: <LuInfo size={20} />,
                        path: "/status/medium"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "CONTROL",
    items: [
      {
        id: "sites-control",
        title: "Sites",
        icon: <LuMapPin size={20} />,
        children: [
          {
            id: "holland-village-control",
            title: "Holland Village",
            children: [
              {
                id: "rooms-control",
                title: "Rooms",
                icon: <LuDoorClosed size={20} />,
                children: [
                  {
                    id: "townhall-control",
                    title: "Townhall",
                    children: [
                      {
                        id: "home",
                        title: "Home",
                        icon: <LuHouse size={20} />,
                        path: "/"
                      },
                      {
                        id: "audio",
                        title: "Audio",
                        icon: <LuMusic size={20} />,
                        path: "/audio"
                      },
                      {
                        id: "cameras",
                        title: "Cameras",
                        icon: <LuVideo size={20} />,
                        path: "/cameras"
                      }
                    ]
                  },
                  {
                    id: "medium-control",
                    title: "Medium",
                    children: [
                      {
                        id: "home-medium",
                        title: "Home",
                        icon: <LuMusic size={20} />,
                        path: "/medium/home"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const renderMenu = (items: MenuItem[], level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0
      const isExpanded = expanded.includes(item.id)

      return (
        <div key={item.id} className="mb-1">
          {item.path ? (
            <Link
              href={item.path}
              className={`flex items-center gap-2 p-1 rounded-md transition-colors 
                ${isOpen ? "px-2" : "justify-center"} 
                ${pathname === item.path ? "bg-blue-500 text-white" : "hover:bg-gray-800"}`}
              style={{ paddingLeft: isOpen ? `${level * 12 + 8}px` : undefined }}
            >
              {item.icon}
              {isOpen && <span>{item.title}</span>}
            </Link>
          ) : (
            <button
              onClick={() => hasChildren && toggleExpand(item.id)}
              className={`flex items-center gap-2 p-1 rounded-md w-full transition-colors
                ${isOpen ? "px-2 justify-between" : "justify-center"} 
                hover:bg-gray-800`}
              style={{ paddingLeft: isOpen ? `${level * 12 + 8}px` : undefined }}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </div>
              {isOpen && hasChildren && (
                isExpanded ? <LuChevronDown size={16} /> : <LuChevronRight size={16} />
              )}
            </button>
          )}
          {hasChildren && isExpanded && renderMenu(item.children!, level + 1)}
        </div>
      )
    })
  }

  return (
    <motion.div
      animate={{ width: isOpen ? "240px" : "60px" }}
      className="bg-gray-900 text-white min-h-screen p-4 relative overflow-y-auto"
    >
      <div className="flex justify-end mb-4">
        <LuMenu
          size={30}
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {menuGroups.map((group) => (
        <div key={group.label} className="mb-6">
          {isOpen && (
            <div className="text-xs text-gray-400 px-2 mb-2">{group.label}</div>
          )}
          {renderMenu(group.items)}
        </div>
      ))}
    </motion.div>
  )
}

export default Sidebar
