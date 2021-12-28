-- CreateTable
CREATE TABLE "companys" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "admin_id" VARCHAR(80) NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "companys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "email" VARCHAR(180) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "token_version" INTEGER NOT NULL DEFAULT 0,
    "profile" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "number" VARCHAR(21) NOT NULL,
    "email" VARCHAR(255) NOT NULL DEFAULT E'',
    "profile_pic_url" VARCHAR(255) NOT NULL,
    "is_group" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_custom_field" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "contact_custom_field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "ack" INTEGER NOT NULL DEFAULT 0,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "from_me" BOOLEAN NOT NULL DEFAULT false,
    "body" TEXT NOT NULL,
    "media_url" TEXT,
    "media_type" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsapps" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sessions" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "battery" VARCHAR(180) NOT NULL,
    "plugged" BOOLEAN NOT NULL,
    "retries" INTEGER NOT NULL,
    "farewell_message" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "whatsapps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quick_answer" (
    "id" TEXT NOT NULL,
    "shortcut" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "quick_answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "status" VARCHAR(180) NOT NULL DEFAULT E'pending',
    "unread_messages" INTEGER NOT NULL,
    "last_message" VARCHAR(255) NOT NULL,
    "is_group" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queues" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "color" VARCHAR(180) NOT NULL,
    "greeting_message" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "queues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TicketsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QueuesToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToTickets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactCustomFieldToContacts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ContactsToMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MessagesToTickets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TicketsToWhatsapps" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QueuesToWhatsapps" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_TicketsToUsers_AB_unique" ON "_TicketsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TicketsToUsers_B_index" ON "_TicketsToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QueuesToUsers_AB_unique" ON "_QueuesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_QueuesToUsers_B_index" ON "_QueuesToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToTickets_AB_unique" ON "_ContactsToTickets"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToTickets_B_index" ON "_ContactsToTickets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactCustomFieldToContacts_AB_unique" ON "_ContactCustomFieldToContacts"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactCustomFieldToContacts_B_index" ON "_ContactCustomFieldToContacts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContactsToMessages_AB_unique" ON "_ContactsToMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_ContactsToMessages_B_index" ON "_ContactsToMessages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MessagesToTickets_AB_unique" ON "_MessagesToTickets"("A", "B");

-- CreateIndex
CREATE INDEX "_MessagesToTickets_B_index" ON "_MessagesToTickets"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TicketsToWhatsapps_AB_unique" ON "_TicketsToWhatsapps"("A", "B");

-- CreateIndex
CREATE INDEX "_TicketsToWhatsapps_B_index" ON "_TicketsToWhatsapps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QueuesToWhatsapps_AB_unique" ON "_QueuesToWhatsapps"("A", "B");

-- CreateIndex
CREATE INDEX "_QueuesToWhatsapps_B_index" ON "_QueuesToWhatsapps"("B");

-- AddForeignKey
ALTER TABLE "_TicketsToUsers" ADD FOREIGN KEY ("A") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketsToUsers" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QueuesToUsers" ADD FOREIGN KEY ("A") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QueuesToUsers" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTickets" ADD FOREIGN KEY ("A") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToTickets" ADD FOREIGN KEY ("B") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactCustomFieldToContacts" ADD FOREIGN KEY ("A") REFERENCES "contact_custom_field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactCustomFieldToContacts" ADD FOREIGN KEY ("B") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToMessages" ADD FOREIGN KEY ("A") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactsToMessages" ADD FOREIGN KEY ("B") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessagesToTickets" ADD FOREIGN KEY ("A") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MessagesToTickets" ADD FOREIGN KEY ("B") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketsToWhatsapps" ADD FOREIGN KEY ("A") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TicketsToWhatsapps" ADD FOREIGN KEY ("B") REFERENCES "whatsapps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QueuesToWhatsapps" ADD FOREIGN KEY ("A") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QueuesToWhatsapps" ADD FOREIGN KEY ("B") REFERENCES "whatsapps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
