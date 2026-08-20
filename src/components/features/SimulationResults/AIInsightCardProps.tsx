import { useConversation } from '@/hooks/useConversation'
import { useInsight } from '@/hooks/useInsight'
import { useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'
import { ConversationComposer } from './ConversationComposer'
import { ConversationMessages } from './ConversationMessages'

interface AIInsightCardProps {
  simulationId: string
  goalName: string
}

export function AIInsightsCard({ simulationId, goalName }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)
  const conversation = useConversation(simulationId)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
  }, [conversation.messages, conversation.isLoading])

  return (
    <div className="bg-card lg:max-h-208 order-2 flex min-h-0 flex-col gap-5 overflow-hidden rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold uppercase tracking-widest">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} goalName={goalName} />}
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="border-border my-6 w-full border-t" />
        <ConversationMessages
          messages={conversation.messages}
          isLoading={conversation.isLoading}
          error={conversation.error}
          onRetry={conversation.retry}
          containerRef={messagesContainerRef}
        />
        <ConversationComposer
          isLoading={conversation.isLoading}
          onSubmit={(question) => void conversation.sendQuestion(question)}
        />
      </div>
    </div>
  )
}
