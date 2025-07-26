import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  tasks: defineTable({
    userId: v.string(),
    categoria: v.string(),
    dataCriacao: v.string(),
    descricao: v.string(),
    dificuldade: v.string(),
    duracao: v.string(),
    importancia: v.string(),
    nivelExperiencia: v.string(),
    pontos: v.float64(),
    tipoExercicio: v.string(),
    completo: v.boolean(),
    dataTermino: v.optional(v.string()),
  }),
  users_data: defineTable({
    experiencia: v.float64(),
    userId: v.string(),
    coins: v.optional(v.float64()),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
