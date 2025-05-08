export interface Post {
  _id: string
  title: string
  text: string
  tags: string[]
  viewsCount: number
  user: {
    _id: string
    fullName: string
  }
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

// Add this interface after the Post interface
export interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

// Базовый URL API
const API_BASE_URL = "https://api.adb-solution.com"

// Функция для обработки ошибок API
const handleApiError = (error: any, fallbackData: any) => {
  console.error("API Error:", error)
  return fallbackData
}

// Получение всех постов
export async function getPosts(): Promise<Post[]> {
  // Фиктивные данные для использования в случае ошибки
  const mockPosts: Post[] = [
    {
      _id: "mock-post-1",
      title: "Налоговые изменения 2023 года: что нужно знать бизнесу",
      text: "Обзор ключевых изменений в налоговом законодательстве, которые вступили в силу в 2023 году и их влияние на бизнес.",
      tags: ["Налоги", "Законодательство", "Бизнес"],
      viewsCount: 245,
      user: {
        _id: "user-1",
        fullName: "Алексей Иванов",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "mock-post-2",
      title: "Финансовая отчетность по МСФО: основные принципы",
      text: "Разбираемся в основных принципах составления финансовой отчетности по международным стандартам и даем практические советы по их применению.",
      tags: ["МСФО", "Финансовая отчетность", "Бухгалтерский учет"],
      viewsCount: 187,
      user: {
        _id: "user-2",
        fullName: "Елена Смирнова",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "mock-post-3",
      title: "Оптимизация налогообложения для малого бизнеса",
      text: "Рассматриваем эффективные и законные методы снижения налоговой нагрузки для предприятий малого и среднего бизнеса.",
      tags: ["Налоговая оптимизация", "Малый бизнес", "Налоговое планирование"],
      viewsCount: 210,
      user: {
        _id: "user-3",
        fullName: "Дмитрий Петров",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  try {
    // Пытаемся получить данные из API
    const response = await fetch(`${API_BASE_URL}/posts`, {
      next: { revalidate: 3600 }, // Кеширование на 1 час
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    // В случае ошибки возвращаем фиктивные данные
    return handleApiError(error, mockPosts)
  }
}

// Получение одного поста по ID
export async function getPost(id: string): Promise<Post | null> {
  // Фиктивные данные для использования в случае ошибки
  const mockPosts: Post[] = [
    {
      _id: "mock-post-1",
      title: "Налоговые изменения 2023 года: что нужно знать бизнесу",
      text: "Обзор ключевых изменений в налоговом законодательстве, которые вступили в силу в 2023 году и их влияние на бизнес. В этой статье мы рассмотрим основные изменения и их потенциальное влияние на вашу компанию.",
      tags: ["Налоги", "Законодательство", "Бизнес"],
      viewsCount: 245,
      user: {
        _id: "user-1",
        fullName: "Алексей Иванов",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "mock-post-2",
      title: "Финансовая отчетность по МСФО: основные принципы",
      text: "Разбираемся в основных принципах составления финансовой отчетности по международным стандартам и даем практические советы по их применению. Международные стандарты финансовой отчетности (МСФО) становятся все более важными для компаний, работающих на международном рынке.",
      tags: ["МСФО", "Финансовая отчетность", "Бухгалтерский учет"],
      viewsCount: 187,
      user: {
        _id: "user-2",
        fullName: "Елена Смирнова",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "mock-post-3",
      title: "Оптимизация налогообложения для малого бизнеса",
      text: "Рассматриваем эффективные и законные методы снижения налоговой нагрузки для предприятий малого и среднего бизнеса. Оптимизация налогообложения — это комплекс мероприятий, направленных на законное снижение налоговой нагрузки.",
      tags: ["Налоговая оптимизация", "Малый бизнес", "Налоговое планирование"],
      viewsCount: 210,
      user: {
        _id: "user-3",
        fullName: "Дмитрий Петров",
      },
      imageUrl: "/placeholder.svg?height=200&width=400",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  try {
    // Пытаемся получить данные из API
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 3600 }, // Кеширование на 1 час
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    // В случае ошибки ищем пост в фиктивных данных
    const mockPost = mockPosts.find((post) => post._id === id)
    return handleApiError(error, mockPost || mockPosts[0])
  }
}

// Функция для поиска постов
export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 }, // Кеширование на 1 минуту для поисковых запросов
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to search posts: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    // В случае ошибки возвращаем пустой массив или выполняем локальный поиск
    const allPosts = await getPosts()
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.text.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )
    return handleApiError(error, filteredPosts)
  }
}

// Add these functions at the end of the file

// Получение всех контактов
export async function getContacts(): Promise<Contact[]> {
  // Фиктивные данные для использования в случае ошибки
  const mockContacts: Contact[] = [
    {
      _id: "contact-1",
      name: "Иван Петров",
      email: "ivan@example.com",
      phone: "+7 (999) 123-45-67",
      message: "Интересуют услуги бухгалтерского учета для ООО",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "contact-2",
      name: "Елена Смирнова",
      email: "elena@example.com",
      phone: "+7 (999) 987-65-43",
      message: "Нужна консультация по налоговой оптимизации",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "contact-3",
      name: "Алексей Иванов",
      email: "alexey@example.com",
      phone: "+7 (999) 456-78-90",
      message: "Требуется аудит финансовой отчетности",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      next: { revalidate: 60 }, // Кеширование на 1 минуту
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    return handleApiError(error, mockContacts)
  }
}

// Получение одного контакта по ID
export async function getContact(id: string): Promise<Contact | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch contact: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    // В случае ошибки ищем контакт в фиктивных данных
    const mockContacts = await getContacts()
    const mockContact = mockContacts.find((contact) => contact._id === id)
    return handleApiError(error, mockContact || null)
  }
}

// Создание нового контакта
export async function createContact(contactData: Omit<Contact, "_id" | "createdAt">): Promise<Contact | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating contact:", error)
    return null
  }
}

// Обновление контакта
export async function updateContact(id: string, contactData: Partial<Contact>): Promise<Contact | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contactData),
    })

    if (!response.ok) {
      throw new Error(`Failed to update contact: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error updating contact:", error)
    return null
  }
}

// Удаление контакта
export async function deleteContact(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete contact: ${response.status} ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error deleting contact:", error)
    return false
  }
}
