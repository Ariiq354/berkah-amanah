export const AkunErrors = {
  kodeUsed: () => ({
    code: "KODE_USED" as const,
  }),

  notFound: () => ({
    code: "AKUN_NOT_FOUND" as const,
  }),

  database: (cause: unknown) => ({
    code: "DATABASE_ERROR" as const,
    cause,
  }),
};
