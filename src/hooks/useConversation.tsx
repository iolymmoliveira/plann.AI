import { useCallback, useEffect, useRef, useState } from 'react'

import { buildConversationPrompt } from '@/data/aiPrompt'
import { getChatResponse } from '@/services/aiService'
import { useSimulationStorage } from './useSimulationStorage'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const CONVERSATION_STORAGE_KEY = 'simulation-conversations'

type ConversationStorage = Record<string, ConversationMessage[]>

const readConversations = (): ConversationStorage => {
  const stored = localStorage.getItem(CONVERSATION_STORAGE_KEY)
  if (!stored) return {}

  try {
    return JSON.parse(stored) as ConversationStorage
  } catch {
    return {}
  }
}

const saveConversation = (simulationId: string, messages: ConversationMessage[]) => {
  const conversations = readConversations()
  conversations[simulationId] = messages
  localStorage.setItem(CONVERSATION_STORAGE_KEY, JSON.stringify(conversations))
}

export function useConversation(simulationId: string) {
  const { getFormData } = useSimulationStorage()
  const [messages, setMessages] = useState<ConversationMessage[]>(() => {
    return readConversations()[simulationId] ?? []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastQuestion = useRef<string | null>(null)

  useEffect(() => {
    setMessages(readConversations()[simulationId] ?? [])
    setError(null)
  }, [simulationId])

  const sendQuestion = useCallback(
    async (question: string) => {
      const simulation = getFormData(simulationId)
      if (!simulation || isLoading) return

      const userMessage: ConversationMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: question,
      }
      const nextMessages = [...messages, userMessage]
      lastQuestion.current = question
      setMessages(nextMessages)
      setIsLoading(true)
      setError(null)

      try {
        const content = await getChatResponse(buildConversationPrompt(simulation, nextMessages))
        const completedMessages = [
          ...nextMessages,
          { id: crypto.randomUUID(), role: 'assistant' as const, content },
        ]
        setMessages(completedMessages)
        saveConversation(simulationId, completedMessages)
        lastQuestion.current = null
      } catch {
        setMessages(messages)
        setError('Não foi possível obter uma resposta. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [getFormData, isLoading, messages, simulationId],
  )

  const retry = useCallback(() => {
    if (lastQuestion.current) {
      void sendQuestion(lastQuestion.current)
    }
  }, [sendQuestion])

  return { messages, isLoading, error, sendQuestion, retry }
}
