-- MySQL dump 10.13  Distrib 5.5.62, for Linux (x86_64)
--
-- Host: localhost    Database: authentication
-- ------------------------------------------------------
-- Server version	5.5.62

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` tinyint(2) NOT NULL AUTO_INCREMENT,
  `username` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(72) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tina','$2b$10$T4sRTiCSONkI704FczsOgu3ebo8nSWQYWjLmpwdTioStl5ZPEHiBG'),(2,'tina','$2b$10$K3cpWgOyYqS1xJNgoDB8bua.2VQ4SZ0ERznlGx3r3PuzDywBodma2'),(3,'tina','$2b$10$.6iglhPekQevnAm1GsurGuJr0YuSnx5XXzohgsWUruKfOUWFbDOFK'),(4,'tina','$2b$10$bBjbJIgSDJNzqFHBbJf2P.azgfO3W5oSjTVWt3in99gKZWT4rEMdm'),(5,'tina','$2b$10$nZTg67YBjcac6eOzKA41s.FlvGShzMbkeSd.fOzzfXKFAymPy8yt2'),(6,'tina','$2b$10$GCyzOTAiyZ70Jj8qRYFSjOydWSoigcuepSql9ZJK/wCdsYRfGOMVS'),(7,'tina','$2b$10$nnlN66JgXxpLSmdXKeegruxNji37RUzcagFDsw5Fnbe9FFGMMNYcy'),(8,'tina','$2b$10$mdElZDaPRHCFdK4Ap/eet.75B2N.10HSs1oCLYtizlrLuust3LKrS'),(9,'tina','$2b$10$y3sJ2gbT02uthWfsSH7V2u9CLNO8t94lGapiCBvxzUPtvLlonZ6xG'),(10,'tina','$2b$10$kK7KL0dfhRPiysZqoU7AheXmi0aeUuQd0Fu7W/TF9rMdaldelFktK'),(11,'tina','$2b$10$tqEo5uxuXy6JzrxbFygfxuMacfagOy8.fnjXk8DaN2B5bzgyEIwoa'),(12,'test','$2b$10$3ZWRpTCbmR8slcn7qhLoq.uScHZq.npTYM2L2FdyCHN8HSeANsvES'),(13,'banana','$2b$10$yHQY8AEBU6pmP9nq2Adlt.hlIv6WgaytVWjOCbMiqXMv3eiUM1Q0y'),(14,'tina','$2b$10$rYruu0Ijsle1A9aA2pY14.K4N3tXy16OacJUD/S13rGjwnWWMFa2i'),(15,'user','$2b$10$sQU4f2.i6SwQ8P2fo0/q2OWqWhPVEiR74ff5HqFFOptS.Eal6unEK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06  5:38:24
