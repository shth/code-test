CREATE DATABASE IF NOT EXISTS `consultationApp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use `consultationApp`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL auto_increment,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `clinicName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `consultations` (
  `id` int NOT NULL auto_increment,
  `clinicId` int NOT NULL,
  `doctorName` varchar(255) NOT NULL,
  `patientName` varchar(255) NOT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `medication` varchar(255) NOT NULL,
  `consultationFee` decimal(10, 2) NOT NULL,
  `dateTime` timestamp NOT NULL,
  `hasFollowUp` boolean NOT NULL,
  primary key (id),
  foreign key (clinicId) references users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET time_zone='+00:00';

INSERT INTO `users` (
    `email`,
    `password`,
    `clinicName`,
	`phone`,
	`address`
    ) VALUES (
        'test@test.com', 
		'test',
        'testClinic',
        '12345678',
        'abc'
	);
    
INSERT INTO `consultations` (
  `clinicId`,
  `doctorName`,
  `patientName`,
  `diagnosis`,
  `medication`,
  `consultationFee`,
  `dateTime`,
  `hasFollowUp`
    ) VALUES (
        '1', 
		'test doctor',
        'test patient',
        'cold',
        'panadol',
        123.40,
        '2021-03-14 10:30:00',
        true
	);
        
INSERT INTO `consultations` (
  `clinicId`,
  `doctorName`,
  `patientName`,
  `diagnosis`,
  `medication`,
  `consultationFee`,
  `dateTime`,
  `hasFollowUp`
    ) VALUES (
        '1', 
		'test doctor 2',
        'test patient 2',
        'fever',
        'panadol',
        321.00,
        '2021-03-15 11:00:00',
        true
	);