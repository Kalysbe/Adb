import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const options = {}

let client
let clientPromise: Promise<MongoClient> | null = null

// Флаг для отслеживания состояния подключения
let isConnected = false

// Функция для создания подключения с обработкой ошибок
const createConnection = async () => {
  if (!uri) {
    console.error("MongoDB URI не найден в переменных окружения")
    return null
  }

  // Проверка формата URI
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.error("Неверный формат MongoDB URI. URI должен начинаться с 'mongodb://' или 'mongodb+srv://'")
    return null
  }

  console.log("Инициализация подключения к MongoDB...")

  try {
    const newClient = new MongoClient(uri, options)
    const connectedClient = await newClient.connect()
    console.log("Успешное подключение к MongoDB")
    isConnected = true
    return connectedClient
  } catch (err) {
    console.error("Ошибка подключения к MongoDB:", err)
    isConnected = false
    return null
  }
}

// Проверка состояния подключения
export const getConnectionStatus = () => {
  return isConnected
}

// Безопасное получение клиента MongoDB
export const getMongoClient = async () => {
  if (!clientPromise) {
    return null
  }

  try {
    return await clientPromise
  } catch (error) {
    console.error("Ошибка при получении MongoDB клиента:", error)
    return null
  }
}

if (process.env.NODE_ENV === "development") {
  // В режиме разработки используем глобальную переменную
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createConnection()
  }
  clientPromise = global._mongoClientPromise
} else {
  // В продакшене создаем новый клиент
  clientPromise = createConnection()
}

export default clientPromise
