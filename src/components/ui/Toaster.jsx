import * as Toast from "@radix-ui/react-toast"
import { useState } from "react"

export function Toaster() {
  const [open, setOpen] = useState(false)
  const [toastContent, setToastContent] = useState({
    title: "",
    description: "",
  })

  // This function is used anywhere in your app
  window.showToast = (title, description) => {
    setToastContent({ title, description })
    setOpen(true)
  }

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        duration={2000}
        className="bg-black text-white px-4 py-3 rounded-lg shadow-lg"
      >
        <Toast.Title className="font-semibold">
          {toastContent.title}
        </Toast.Title>

        <Toast.Description className="text-sm opacity-80">
          {toastContent.description}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 z-[999]" />
    </Toast.Provider>
  )
}
