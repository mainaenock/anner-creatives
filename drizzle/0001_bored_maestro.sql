CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`amount` real NOT NULL,
	`vendor` text,
	`payment_method` text NOT NULL,
	`reference` text,
	`occurred_at` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inventory_movements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`kind` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_cost` real NOT NULL,
	`total_cost` real NOT NULL,
	`note` text,
	`payment_method` text,
	`reference` text,
	`occurred_at` text NOT NULL,
	`order_id` text
);
--> statement-breakpoint
ALTER TABLE `orders` ADD `paid_at` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `payment_method` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `payment_reference` text;--> statement-breakpoint
ALTER TABLE `orders` ADD `cost_of_goods` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `unit_cost` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `stock_quantity` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE TRIGGER prevent_negative_stock BEFORE UPDATE OF stock_quantity ON products
WHEN NEW.stock_quantity < 0 BEGIN SELECT RAISE(ABORT, 'Insufficient stock'); END;--> statement-breakpoint
CREATE TRIGGER prevent_duplicate_payment BEFORE UPDATE OF status ON orders
WHEN NEW.status = 'paid' AND OLD.status <> 'awaiting_payment' BEGIN SELECT RAISE(ABORT, 'Order already processed'); END;
