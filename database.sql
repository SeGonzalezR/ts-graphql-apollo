CREATE TABLE `cats` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cats` (`id`, `name`, `created`, `modified`)
VALUES
	(1, 'Smiaug Albus Percival Wulfric Brian González Dumbledore', '2021-05-31 02:18:23', '2021-05-31 02:18:25');
