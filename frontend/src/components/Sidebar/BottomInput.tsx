export default function BottomInput() {
    return (
      <div className="fixed rounded-t-xl bottom-0 left-0 flex w-96 items-center justify-between bg-neutral-700 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="mr-2 flex-grow rounded-md border border-neutral-600 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-400 focus:border-neutral-500 focus:outline-none"
        />
        <button
          className="rounded-md bg-white px-4 py-2 text-black font-semibold transition-colors hover:bg-neutral-100"
        >
          Send
        </button>
      </div>
    )
  }
  
  