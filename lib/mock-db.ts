// In-memory storage for users
const users: any[] = []

export const mockDb = {
  users: {
    create: async (userData: any) => {
      const id = Date.now().toString()
      const newUser = { id, ...userData, createdAt: new Date(), updatedAt: new Date() }
      users.push(newUser)
      return newUser
    },
    findByEmail: async (email: string) => {
      return users.find((user) => user.email === email) || null
    },
    findById: async (id: string) => {
      return users.find((user) => user.id === id) || null
    },
  },
}

