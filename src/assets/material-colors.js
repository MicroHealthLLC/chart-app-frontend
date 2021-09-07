const materialColors = [
  "rgba(244, 67, 54, 0.75)",
  "rgba(239, 154, 154, 0.75)",
  "rgba(229, 115, 115, 0.75)",
  "rgba(239, 83, 80, 0.75)",
  "rgba(229, 57, 53, 0.75)",
  "rgba(211, 47, 47, 0.75)",
  "rgba(198, 40, 40, 0.75)",
  "rgba(183, 28, 28, 0.75)",
  "rgba(255, 138, 128, 0.75)",
  "rgba(255, 82, 82, 0.75)",
  "rgba(255, 23, 68, 0.75)",
  "rgba(213, 0, 0, 0.75)",
  "rgba(244, 143, 177, 0.75)",
  "rgba(240, 98, 146, 0.75)",
  "rgba(236, 64, 122, 0.75)",
  "rgba(233, 30, 99, 0.75)",
  "rgba(216, 27, 96, 0.75)",
  "rgba(194, 24, 91, 0.75)",
  "rgba(173, 20, 87, 0.75)",
  "rgba(136, 14, 79, 0.75)",
  "rgba(255, 128, 171, 0.75)",
  "rgba(255, 64, 129, 0.75)",
  "rgba(245, 0, 87, 0.75)",
  "rgba(197, 17, 98, 0.75)",
  "rgba(206, 147, 216, 0.75)",
  "rgba(186, 104, 200, 0.75)",
  "rgba(171, 71, 188, 0.75)",
  "rgba(156, 39, 176, 0.75)",
  "rgba(142, 36, 170, 0.75)",
  "rgba(123, 31, 162, 0.75)",
  "rgba(106, 27, 154, 0.75)",
  "rgba(74, 20, 140, 0.75)",
  "rgba(234, 128, 252, 0.75)",
  "rgba(224, 64, 251, 0.75)",
  "rgba(213, 0, 249, 0.75)",
  "rgba(170, 0, 255, 0.75)",
  "rgba(179, 157, 219, 0.75)",
  "rgba(149, 117, 205, 0.75)",
  "rgba(126, 87, 194, 0.75)",
  "rgba(103, 58, 183, 0.75)",
  "rgba(94, 53, 177, 0.75)",
  "rgba(81, 45, 168, 0.75)",
  "rgba(69, 39, 160, 0.75)",
  "rgba(49, 27, 146, 0.75)",
  "rgba(179, 136, 255, 0.75)",
  "rgba(124, 77, 255, 0.75)",
  "rgba(101, 31, 255, 0.75)",
  "rgba(98, 0, 234, 0.75)",
  "rgba(159, 168, 218, 0.75)",
  "rgba(121, 134, 203, 0.75)",
  "rgba(92, 107, 192, 0.75)",
  "rgba(63, 81, 181, 0.75)",
  "rgba(57, 73, 171, 0.75)",
  "rgba(48, 63, 159, 0.75)",
  "rgba(40, 53, 147, 0.75)",
  "rgba(26, 35, 126, 0.75)",
  "rgba(140, 158, 255, 0.75)",
  "rgba(83, 109, 254, 0.75)",
  "rgba(61, 90, 254, 0.75)",
  "rgba(48, 79, 254, 0.75)",
  "rgba(144, 202, 249, 0.75)",
  "rgba(100, 181, 246, 0.75)",
  "rgba(66, 165, 245, 0.75)",
  "rgba(33, 150, 243, 0.75)",
  "rgba(30, 136, 229, 0.75)",
  "rgba(25, 118, 210, 0.75)",
  "rgba(21, 101, 192, 0.75)",
  "rgba(13, 71, 161, 0.75)",
  "rgba(130, 177, 255, 0.75)",
  "rgba(68, 138, 255, 0.75)",
  "rgba(41, 121, 255, 0.75)",
  "rgba(41, 98, 255, 0.75)",
  "rgba(129, 212, 250, 0.75)",
  "rgba(79, 195, 247, 0.75)",
  "rgba(41, 182, 246, 0.75)",
  "rgba(3, 169, 244, 0.75)",
  "rgba(3, 155, 229, 0.75)",
  "rgba(2, 136, 209, 0.75)",
  "rgba(2, 119, 189, 0.75)",
  "rgba(1, 87, 155, 0.75)",
  "rgba(128, 216, 255, 0.75)",
  "rgba(64, 196, 255, 0.75)",
  "rgba(0, 176, 255, 0.75)",
  "rgba(0, 145, 234, 0.75)",
  "rgba(128, 222, 234, 0.75)",
  "rgba(77, 208, 225, 0.75)",
  "rgba(38, 198, 218, 0.75)",
  "rgba(0, 188, 212, 0.75)",
  "rgba(0, 172, 193, 0.75)",
  "rgba(0, 151, 167, 0.75)",
  "rgba(0, 131, 143, 0.75)",
  "rgba(132, 255, 255, 0.75)",
  "rgba(24, 255, 255, 0.75)",
  "rgba(0, 229, 255, 0.75)",
  "rgba(0, 184, 212, 0.75)",
  "rgba(128, 203, 196, 0.75)",
  "rgba(77, 182, 172, 0.75)",
  "rgba(38, 166, 154, 0.75)",
  "rgba(0, 137, 123, 0.75)",
  "rgba(0, 121, 107, 0.75)",
  "rgba(0, 105, 92, 0.75)",
  "rgba(0, 77, 64, 0.75)",
  "rgba(167, 255, 235, 0.75)",
  "rgba(100, 255, 218, 0.75)",
  "rgba(29, 233, 182, 0.75)",
  "rgba(0, 191, 165, 0.75)",
  "rgba(165, 214, 167, 0.75)",
  "rgba(129, 199, 132, 0.75)",
  "rgba(102, 187, 106, 0.75)",
  "rgba(76, 175, 80, 0.75)",
  "rgba(67, 160, 71, 0.75)",
  "rgba(56, 142, 60, 0.75)",
  "rgba(46, 125, 50, 0.75)",
  "rgba(27, 94, 32, 0.75)",
  "rgba(185, 246, 202, 0.75)",
  "rgba(105, 240, 174, 0.75)",
  "rgba(0, 230, 118, 0.75)",
  "rgba(0, 200, 83, 0.75)",
  "rgba(197, 225, 165, 0.75)",
  "rgba(174, 213, 129, 0.75)",
  "rgba(156, 204, 101, 0.75)",
  "rgba(139, 195, 74, 0.75)",
  "rgba(124, 179, 66, 0.75)",
  "rgba(104, 159, 56, 0.75)",
  "rgba(85, 139, 47, 0.75)",
  "rgba(51, 105, 30, 0.75)",
  "rgba(204, 255, 144, 0.75)",
  "rgba(178, 255, 89, 0.75)",
  "rgba(118, 255, 3, 0.75)",
  "rgba(100, 221, 23, 0.75)",
  "rgba(230, 238, 156, 0.75)",
  "rgba(220, 231, 117, 0.75)",
  "rgba(212, 225, 87, 0.75)",
  "rgba(205, 220, 57, 0.75)",
  "rgba(192, 202, 51, 0.75)",
  "rgba(175, 180, 43, 0.75)",
  "rgba(158, 157, 36, 0.75)",
  "rgba(130, 119, 23, 0.75)",
  "rgba(244, 255, 129, 0.75)",
  "rgba(238, 255, 65, 0.75)",
  "rgba(198, 255, 0, 0.75)",
  "rgba(174, 234, 0, 0.75)",
  "rgba(255, 245, 157, 0.75)",
  "rgba(255, 241, 118, 0.75)",
  "rgba(255, 238, 88, 0.75)",
  "rgba(255, 235, 59, 0.75)",
  "rgba(253, 216, 53, 0.75)",
  "rgba(251, 192, 45, 0.75)",
  "rgba(249, 168, 37, 0.75)",
  "rgba(245, 127, 23, 0.75)",
  "rgba(255, 255, 141, 0.75)",
  "rgba(255, 255, 0, 0.75)",
  "rgba(255, 234, 0, 0.75)",
  "rgba(255, 214, 0, 0.75)",
  "rgba(255, 224, 130, 0.75)",
  "rgba(255, 213, 79, 0.75)",
  "rgba(255, 202, 40, 0.75)",
  "rgba(255, 193, 7, 0.75)",
  "rgba(255, 179, 0, 0.75)",
  "rgba(255, 160, 0, 0.75)",
  "rgba(255, 143, 0, 0.75)",
  "rgba(255, 111, 0, 0.75)",
  "rgba(255, 229, 127, 0.75)",
  "rgba(255, 215, 64, 0.75)",
  "rgba(255, 196, 0, 0.75)",
  "rgba(255, 171, 0, 0.75)",
  "rgba(255, 204, 128, 0.75)",
  "rgba(255, 183, 77, 0.75)",
  "rgba(255, 167, 38, 0.75)",
  "rgba(255, 152, 0, 0.75)",
  "rgba(251, 140, 0, 0.75)",
  "rgba(245, 124, 0, 0.75)",
  "rgba(239, 108, 0, 0.75)",
  "rgba(230, 81, 0, 0.75)",
  "rgba(255, 209, 128, 0.75)",
  "rgba(255, 171, 64, 0.75)",
  "rgba(255, 145, 0, 0.75)",
  "rgba(255, 109, 0, 0.75)",
  "rgba(255, 204, 188, 0.75)",
  "rgba(255, 171, 145, 0.75)",
  "rgba(255, 138, 101, 0.75)",
  "rgba(255, 112, 67, 0.75)",
  "rgba(255, 87, 34, 0.75)",
  "rgba(244, 81, 30, 0.75)",
  "rgba(230, 74, 25, 0.75)",
  "rgba(216, 67, 21, 0.75)",
  "rgba(191, 54, 12, 0.75)",
  "rgba(255, 158, 128, 0.75)",
  "rgba(255, 110, 64, 0.75)",
  "rgba(255, 61, 0, 0.75)",
  "rgba(221, 44, 0, 0.75)",
  "rgba(239, 235, 233, 0.75)",
  "rgba(215, 204, 200, 0.75)",
  "rgba(188, 170, 164, 0.75)",
  "rgba(161, 136, 127, 0.75)",
  "rgba(141, 110, 99, 0.75)",
  "rgba(121, 85, 72, 0.75)",
  "rgba(109, 76, 65, 0.75)",
  "rgba(93, 64, 55, 0.75)",
  "rgba(78, 52, 46, 0.75)",
  "rgba(62, 39, 35, 0.75)",
  "rgba(250, 250, 250, 0.75)",
  "rgba(245, 245, 245, 0.75)",
  "rgba(238, 238, 238, 0.75)",
  "rgba(224, 224, 224, 0.75)",
  "rgba(189, 189, 189, 0.75)",
  "rgba(158, 158, 158, 0.75)",
  "rgba(117, 117, 117, 0.75)",
  "rgba(97, 97, 97, 0.75)",
  "rgba(66, 66, 66, 0.75)",
  "rgba(33, 33, 33, 0.75)",
  "rgba(236, 239, 241, 0.75)",
  "rgba(207, 216, 220, 0.75)",
  "rgba(176, 190, 197, 0.75)",
  "rgba(144, 164, 174, 0.75)",
  "rgba(120, 144, 156, 0.75)",
  "rgba(96, 125, 139, 0.75)",
  "rgba(84, 110, 122, 0.75)",
  "rgba(69, 90, 100, 0.75)",
  "rgba(55, 71, 79, 0.75)",
  "rgba(38, 50, 56, 0.75)",
];

export default materialColors;
