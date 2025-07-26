// import { mutation } from "./_generated/server";
// import { v } from "convex/values";
// import { query } from "./_generated/server";
// import dayjs from "dayjs";
// import { atualizarXP, addCoinsUser } from "./users";

// export const createTask = mutation({
//   args: {
//     userId: v.string(),
//     categoria: v.string(),
//     dataCriacao: v.string(),
//     descricao: v.string(),
//     dificuldade: v.string(),
//     duracao: v.string(),
//     importancia: v.string(),
//     nivelExperiencia: v.string(),
//     pontos: v.float64(),
//     tipoExercicio: v.string(),
//     completo: v.boolean(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("tasks", {
//       userId: args.userId,
//       categoria: args.categoria,
//       dataCriacao: args.dataCriacao,
//       descricao: args.descricao,
//       dificuldade: args.dificuldade,
//       duracao: args.duracao,
//       importancia: args.importancia,
//       nivelExperiencia: args.nivelExperiencia,
//       pontos: args.pontos,
//       tipoExercicio: args.tipoExercicio,
//       completo: args.completo,
//     });
//   },
// });

// export const getTasksList = query({
//   args: { userId: v.string() },
//   handler: async (ctx, { userId }) => {
//     let tasks = await ctx.db
//       .query("tasks")
//       .filter((q) =>
//         q.and(q.eq(q.field("completo"), false), q.eq(q.field("userId"), userId))
//       )
//       .take(100);

//     tasks = tasks.sort(
//       (a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)
//     );
//     return tasks;
//   },
// });

// export const tarefaConcluida = query({
//   args: { userId: v.string() },
//   handler: async (ctx, { userId }) => {
//     let tasks = await ctx.db
//       .query("tasks")
//       .filter((q) =>
//         q.and(q.eq(q.field("completo"), true), q.eq(q.field("userId"), userId))
//       )
//       .take(12);

//     tasks = tasks.sort(
//       (a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)
//     );
//     return tasks;
//   },
// });

// export const experienciaUsuario = query({
//   args: { userId: v.string() },
//   handler: async (ctx, { userId }) => {
//     const userXp = await ctx.db
//       .query("users_data")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .first();

//     return userXp ? userXp.experiencia : 0; // Retorna 0 se não encontrar.
//   },
// });

// export const completarTarefa = mutation({
//   args: { id: v.optional(v.id("tasks")) },
//   handler: async (ctx, { id }) => {
//     if (!id) {
//       throw new Error("ID da tarefa é obrigatório.");
//     }

//     const task = await ctx.db.get(id);
//     if (!task || task.completo) {
//       throw new Error("Tarefa inválida ou já concluída.");
//     }

//     const dataCriacao = dayjs(task.dataCriacao);
//     const dataTermino = dayjs(task.duracao);
//     const dataHoje = dayjs(); // DATA DE HOJE

//     let diffCriacaoHoje;
//     let diffCriacaoTermino;

//     if (
//       task.duracao == "Curto prazo (1 dia a 1 semana)" ||
//       task.duracao == "Médio prazo (1 semana a 1 mês)" ||
//       task.duracao == "Longo prazo (mais de 1 mês)"
//     ) {
//       diffCriacaoHoje = dataHoje.diff(dataCriacao, "days"); //DIFERENÇA DA DATA DE FINALIZAÇÃO E CRIAÇÃO

//       if (task.duracao == "Curto prazo (1 dia a 1 semana)") {
//         diffCriacaoTermino = 4;
//       }
//       if (task.duracao == "Médio prazo (1 semana a 1 mês)") {
//         diffCriacaoTermino = 14;
//       }
//       if (task.duracao == "Longo prazo (mais de 1 mês)") {
//         diffCriacaoTermino = 60;
//       }

//       console.log(`Dias entre criação e término: ${diffCriacaoTermino / 2}`);
//       console.log(`Dias entre criação e hoje: ${diffCriacaoHoje}`);
//     } else {
//       diffCriacaoTermino = dataTermino.diff(dataCriacao, "days"); //DIFERENÇA ENTRE TÉRMINO SETADO E CRIAÇÃO
//       diffCriacaoHoje = dataHoje.diff(dataCriacao, "days"); //DIFERENÇA DA DATA DE FINALIZAÇÃO E CRIAÇÃO

//       console.log(`Dias entre criação e término: ${diffCriacaoTermino}`);
//       console.log(`Dias entre criação e hoje: ${diffCriacaoHoje}`);
//       console.log(`Tempo mínimo para completar: ${diffCriacaoTermino / 2}`);
//     }

//     // VERIFICA SE JÁ PASSOU O TEMPO MÍNIMO
//     if (diffCriacaoHoje < diffCriacaoTermino / 2) {
//       const msg = `Você não pode completar a tarefa antes de metade do prazo, que é em ${dataCriacao
//         .add(diffCriacaoTermino / 2, "days")
//         .format("YYYY-MM-DD")}`;
//       console.log(msg);
//       return;
//     } else {
//       const dataTermino = new Date().toISOString();
//       await ctx.db.patch(id, { completo: true, dataTermino });

//       // Chama a função de atualização da experiência
//       await atualizarXP(ctx, {
//         userId: task.userId,
//         points: task.pontos,
//       });

//       await addCoinsUser(ctx, {
//         userId: task.userId,
//         coins: 4,
//       });
//     }
//   },
// });

// export const deleteById = mutation({
//   args: { id: v.id("tasks") },
//   handler: async (ctx, args) => {
//     const { id } = args;
//     const task = await ctx.db.get(id);

//     if (!task) {
//       throw new Error("Tarefa não encontrada.");
//     }

//     const pontosDaTarefa = task.pontos;

//     // Subtrai os pontos da tarefa removida da experiência do usuário
//     const userId = task.userId;
//     const usuario = await ctx.db
//       .query("users_data")
//       .filter((q) => q.eq(q.field("userId"), userId)) // Alterado de 'id' para 'userId'
//       .first();

//     let metadeXp = pontosDaTarefa / 2;

//     if (usuario) {
//       const novosPontos = usuario.experiencia - Math.round(metadeXp);
//       await ctx.db.patch(usuario._id, {
//         experiencia: novosPontos,
//       });
//     }

//     // Deleta a tarefa
//     await ctx.db.delete(id);

//     return pontosDaTarefa;
//   },
// });

// export const deletarTudo = mutation({
//   args: { userId: v.string() },
//   handler: async (ctx, { userId }) => {
//     // Busca todas as tarefas do usuário
//     const tasks = await ctx.db
//       .query("tasks")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .collect();

//     if (tasks.length === 0) {
//       throw new Error("Nenhuma tarefa encontrada para este usuário.");
//     }

//     // Deleta as tarefas
//     await Promise.all(tasks.map((task) => ctx.db.delete(task._id)));

//     // Deleta os dados do usuário na tabela "users_data"
//     const userData = await ctx.db
//       .query("users_data")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .first(); // Obtém o primeiro item que corresponder ao userId

//     if (userData) {
//       await ctx.db.delete(userData._id); // Deleta o item encontrado
//     }

//     return "Todas as tarefas foram removidas com sucesso.";
//   },
// });

// export const editarTask = mutation({
//   args: {
//     id: v.id("tasks"),
//     descricao: v.optional(v.string()),
//     duracao: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const updateData = {};
//     if (args.descricao !== "") {
//       updateData.descricao = args.descricao;
//     }
//     if (args.duracao !== "") {
//       updateData.duracao = args.duracao;
//     }

//     await ctx.db.patch(args.id, updateData);
//   },
// });
