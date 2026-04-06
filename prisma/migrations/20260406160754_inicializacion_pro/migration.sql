-- CreateTable
CREATE TABLE "Familia" (
    "id" SERIAL NOT NULL,
    "nombreApellido" TEXT NOT NULL,
    "codigoAcceso" TEXT NOT NULL,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Miembro" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "xpTotal" INTEGER NOT NULL DEFAULT 0,
    "monedas" INTEGER NOT NULL DEFAULT 0,
    "familiaId" INTEGER NOT NULL,

    CONSTRAINT "Miembro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tarea" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "xpRecompensa" INTEGER NOT NULL,
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "miembroId" INTEGER NOT NULL,

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Familia_codigoAcceso_key" ON "Familia"("codigoAcceso");

-- AddForeignKey
ALTER TABLE "Miembro" ADD CONSTRAINT "Miembro_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_miembroId_fkey" FOREIGN KEY ("miembroId") REFERENCES "Miembro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
