-- CreateTable
CREATE TABLE "Motorista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motorista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Onibus" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "capacidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Onibus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorista_cpf_key" ON "Motorista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Onibus_placa_key" ON "Onibus"("placa");
