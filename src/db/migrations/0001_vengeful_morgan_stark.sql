CREATE TABLE `image_url` (
	`id_image_url` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`image_ia_id` text NOT NULL,
	FOREIGN KEY (`image_ia_id`) REFERENCES `images_ia`(`image_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `images_ia` (
	`image_id` text PRIMARY KEY NOT NULL,
	`id_user` text NOT NULL
);
--> statement-breakpoint
DROP INDEX `images_url_unique`;