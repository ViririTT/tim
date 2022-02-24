ALTER TABLE panelbeaters DROP IF EXISTS my_column;
ALTER TABLE panelbeaters MODIFY id int NOT NULL AUTO_INCREMENT;

ALTER TABLE `panelbeaters` CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;
SHOW COLUMNS FROM panelbeaters;
ALTER TABLE `panelbeaters`  ADD `id` INT NOT NULL AUTO_INCREMENT ,  ADD   PRIMARY KEY  (`id`);
ALTER TABLE `panelbeaters` DROP `id`;
GRANT ALL ON *.* to 'tim'@'localhost' identified by 'passw0rd';

FLUSH PRIVILEGES;
20.87.32.246/:10060