create database PROPERTYPRO;
use PROPERTYPRO;
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `u_name` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `psswd` varchar(300) NOT NULL,
  `a_type` char(1) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for for_rent
-- ----------------------------
DROP TABLE IF EXISTS `for_rent`;
CREATE TABLE `for_rent` (
  `U_ID` int NOT NULL,
  `R_ID` int NOT NULL,
  `property_type` varchar(20) NOT NULL,
  `apt_num` int DEFAULT NULL,
  `street_num` int NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(15) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` char(5) NOT NULL,
  `available_date` datetime NOT NULL,
  `price` int NOT NULL,
  `bedroom` int NOT NULL,
  `bathroom` int NOT NULL,
  `living` int NOT NULL,
  `parking` int NOT NULL,
  `size_sqft` int NOT NULL,
  `pic_path` varchar(100) NOT NULL,
  PRIMARY KEY (`U_ID`,`R_ID`),
  CONSTRAINT `for_rent_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `account` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for for_sale
-- ----------------------------
DROP TABLE IF EXISTS `for_sale`;
CREATE TABLE `for_sale` (
  `U_ID` int NOT NULL,
  `S_ID` int NOT NULL,
  `property_type` varchar(20) NOT NULL,
  `apt_num` int DEFAULT NULL,
  `street_num` int NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(15) NOT NULL,
  `state` char(2) NOT NULL,
  `zip` char(5) NOT NULL,
  `S_status` char(1) NOT NULL,
  `price` int NOT NULL,
  `bedroom` int NOT NULL,
  `bathroom` int NOT NULL,
  `living` int NOT NULL,
  `parking` int NOT NULL,
  `area` int NOT NULL,
  `pic_path` varchar(100) NOT NULL,
  PRIMARY KEY (`U_ID`,`S_ID`),
  CONSTRAINT `for_sale_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `account` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for open_house
-- ----------------------------
DROP TABLE IF EXISTS `open_house`;
CREATE TABLE `open_house` (
  `U_ID` int NOT NULL,
  `S_ID` int NOT NULL,
  `from_date` datetime NOT NULL,
  `to_date` datetime NOT NULL,
  PRIMARY KEY (`U_ID`,`S_ID`),
  CONSTRAINT `open_house_ibfk_1` FOREIGN KEY (`U_ID`, `S_ID`) REFERENCES `for_sale` (`U_ID`, `S_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for realtor
-- ----------------------------
DROP TABLE IF EXISTS `realtor`;
CREATE TABLE `realtor` (
  `U_ID` int NOT NULL,
  `Fname` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `phone` char(10) NOT NULL,
  `zipcode` char(5) NOT NULL,
  `sales` int DEFAULT NULL,
  `rent` int DEFAULT NULL,
  `sepcialty` char(1) NOT NULL,
  PRIMARY KEY (`U_ID`),
  CONSTRAINT `realtor_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `account` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for visit
-- ----------------------------
DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit` (
  `U_ID` int NOT NULL,
  `R_ID` int NOT NULL,
  `v_time` datetime NOT NULL,
  PRIMARY KEY (`U_ID`,`R_ID`),
  CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`U_ID`, `R_ID`) REFERENCES `for_rent` (`U_ID`, `R_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
