CREATE TABLE `tb_categories` ( 
`category_id` bigint(20) NOT NULL AUTO_INCREMENT, 
`has_products` tinyint(4) NOT NULL DEFAULT '0', 
`category_name` mediumtext CHARACTER SET utf8 NOT NULL, 
`category_image` mediumtext CHARACTER SET utf8 NOT NULL, 
`creation_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
`is_blocked` tinyint(1) NOT NULL DEFAULT '0', 
PRIMARY KEY (`category_id`) 
) ENGINE=InnoDB AUTO_INCREMENT=8676 DEFAULT CHARSET=latin1

CREATE TABLE `tb_products` ( 
`product_id` bigint(20) NOT NULL AUTO_INCREMENT, 
`name` text, 
`description` text, 
`parent_category_id` bigint(20) DEFAULT NULL, 
`is_enabled` tinyint(4) NOT NULL DEFAULT '1', 
`is_deleted` tinyint(4) NOT NULL DEFAULT '0', 
PRIMARY KEY (`product_id`), 
KEY `parent_category_id` (`parent_category_id`) 
) ENGINE=InnoDB AUTO_INCREMENT=634644 DEFAULT CHARSET=utf8


CREATE TABLE `tb_users` ( 
`user_id` bigint(20) NOT NULL AUTO_INCREMENT, 
`user_name` text, 
`is_admin` tinyint(4) NOT NULL DEFAULT '0', 
`is_deleted` tinyint(4) NOT NULL DEFAULT '0', 
PRIMARY KEY (`user_id`), 
) ENGINE=InnoDB AUTO_INCREMENT=634644 DEFAULT CHARSET=utf8