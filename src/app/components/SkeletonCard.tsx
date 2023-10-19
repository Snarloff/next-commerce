import { clsx } from 'clsx'

export function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
  return (
    <div
      className={clsx('flex h-96 flex-col bg-slate-800 p-5 text-gray-300 shadow-lg', {
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent':
          isLoading,
      })}
    >
      <div className="relative max-h-72 flex-1 bg-zinc-700" />
      <div className="my-3 flex justify-between bg-zinc-700 font-bold" />
      <div className="h-3 w-8/12 rounded-lg bg-zinc-700" />
    </div>
  )
}
