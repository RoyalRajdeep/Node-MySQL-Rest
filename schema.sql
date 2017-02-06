-- Database: `test`

-- Table structure for table `instruments`
CREATE TABLE IF NOT EXISTS `instruments` (
  `instrument_id` int(10) NOT NULL,
  `position` int(10) NOT NULL,
  PRIMARY KEY (`instrument_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

-- Dumping data for table `instruments`
INSERT INTO `instruments` (`instrument_id`, `position`) VALUES
(54571, -1000),
(54573, 1000),
(54578, -1500),
(54513, 2000);