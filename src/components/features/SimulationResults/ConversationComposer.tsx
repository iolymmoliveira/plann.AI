import { Send } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/shared/Button'

interface ConversationComposerProps {
  isLoading: boolean
  onSubmit: (question: string) => void
}

export function ConversationComposer({ isLoading, onSubmit }: ConversationComposerProps) {
  const [question, setQuestion] = useState('')

  const handleSubmit = () => {
    const value = question.trim()
    if (!value || isLoading) return

    onSubmit(value)
    setQuestion('')
  }

  return (
    <form
      className="bg-input flex items-center gap-2 rounded-2xl p-1.5 pl-4"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <input
        aria-label="Pergunte ao educador financeiro"
        className="text-muted-foreground placeholder:text-muted-foreground py-4.5 h-15 min-w-0 flex-1 rounded-[20px] bg-transparent px-5 text-xs shadow-[4px_4px_18px_0px_rgba(0,0,0,0.25)] outline-none"
        disabled={isLoading}
        placeholder="Faça uma pergunta sobre sua simulação..."
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <Button
        aria-label="Enviar pergunta"
        className="h-15 w-15 shrink-0 rounded-2xl"
        disabled={isLoading || !question.trim()}
        icon={Send}
        variant="primary"
        type="submit"
      />
    </form>
  )
}
