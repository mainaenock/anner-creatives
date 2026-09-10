CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`phone` text NOT NULL,
	`location` text NOT NULL,
	`items_json` text NOT NULL,
	`subtotal` real NOT NULL,
	`delivery_fee` real NOT NULL,
	`status` text DEFAULT 'awaiting_payment' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`price` real NOT NULL,
	`old_price` real,
	`image_key` text,
	`active` integer DEFAULT true NOT NULL
);
