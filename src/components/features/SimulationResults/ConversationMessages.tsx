import { MessageCircle } from 'lucide-react'
import type { RefObject } from 'react'

import type { ConversationMessage } from '@/hooks/useConversation'

interface ConversationMessagesProps {
  messages: ConversationMessage[]
  isLoading: boolean
  error: string | null
  onRetry: () => void
  containerRef: RefObject<HTMLDivElement | null>
}

export function ConversationMessages({
  messages,
  isLoading,
  error,
  onRetry,
  containerRef,
}: ConversationMessagesProps) {
  return (
    <div
      ref={containerRef}
      className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-1 [scrollbar-color:var(--border)_transparent]"
    >
      {messages.length === 0 && !isLoading && (
        <p className="text-muted-foreground text-sm">
          Faça uma pergunta sobre sua simulação para conversar com seu educador financeiro.
        </p>
      )}
      {messages.map((message) => (
        <div key={message.id} className="border-border border-t pt-4 first:border-t-0 first:pt-0">
          <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold">
            <MessageCircle size={16} />
            {message.role === 'user' ? 'Você' : 'Resposta da IA'}
          </div>
          <p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </div>
      ))}
      {isLoading && (
        <div className="border-border border-t pt-4">
          <p className="text-primary text-xs font-semibold">Resposta da IA</p>
          <p className="text-muted-foreground mt-2 text-sm">Analisando sua pergunta...</p>
        </div>
      )}
      {error && (
        <div className="border-border border-t pt-4">
          <p className="text-sm text-red-500">{error}</p>
          <button
            type="button"
            className="text-primary mt-2 text-sm font-semibold hover:opacity-80"
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  )
}
