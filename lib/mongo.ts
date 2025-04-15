import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const options = {}

let client
let clientPromise: Promise<MongoClient>

// Флаг для отслеживания состояния подключения
let isConnected = false

// Функция для создания подключения с обработкой ошибок
const createConnection = async () => {
  if (!uri) {
    console.error("MongoDB URI не найден в переменных окружения")
    // Вместо выброса исключения, возвращаем null
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
    // Вместо выброса исключения, возвращаем null
    return null
  }
}

// Проверка состояния подключения
export const getConnectionStatus = () => {
  return isConnected
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
