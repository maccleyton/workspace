// Dados da Tabela Periódica (exemplo reduzido)
const elements = [
	{ number: 1, symbol: "H", name: "Hidrogênio", mass: "1.008", category: "nonmetal", state: "Gasoso", density: "0.0000899", melting: "-259.16", boiling: "-252.87", electronegativity: "2.20", configuration: "1s¹", radius: "53", discovered: "1766", protons: 1, neutrons: 0, electrons: 1 },
	{ number: 2, symbol: "He", name: "Hélio", mass: "4.0026", category: "noble-gas", state: "Gasoso", density: "0.0001785", melting: "-272.20", boiling: "-268.93", electronegativity: "-", configuration: "1s²", radius: "31", discovered: "1868", protons: 2, neutrons: 2, electrons: 2 },
	{ number: 3, symbol: "Li", name: "Lítio", mass: "6.94", category: "alkali-metal", state: "Sólido", density: "0.534", melting: "180.50", boiling: "1342", electronegativity: "0.98", configuration: "[He] 2s¹", radius: "167", discovered: "1817", protons: 3, neutrons: 4, electrons: 3 },
	{ number: 4, symbol: "Be", name: "Berílio", mass: "9.0122", category: "alkaline-earth-metal", state: "Sólido", density: "1.85", melting: "1287", boiling: "2470", electronegativity: "1.57", configuration: "[He] 2s²", radius: "112", discovered: "1798", protons: 4, neutrons: 5, electrons: 4 },
	{ number: 5, symbol: "B", name: "Boro", mass: "10.81", category: "metalloid", state: "Sólido", density: "2.34", melting: "2076", boiling: "3927", electronegativity: "2.04", configuration: "[He] 2s² 2p¹", radius: "87", discovered: "1808", protons: 5, neutrons: 6, electrons: 5 },
	{ number: 6, symbol: "C", name: "Carbono", mass: "12.011", category: "nonmetal", state: "Sólido", density: "2.267", melting: "3550", boiling: "4027", electronegativity: "2.55", configuration: "[He] 2s² 2p²", radius: "67", discovered: "Antiguidade", protons: 6, neutrons: 6, electrons: 6 },
	{ number: 7, symbol: "N", name: "Nitrogênio", mass: "14.007", category: "nonmetal", state: "Gasoso", density: "0.0012506", melting: "-210.1", boiling: "-195.79", electronegativity: "3.04", configuration: "[He] 2s² 2p³", radius: "56", discovered: "1772", protons: 7, neutrons: 7, electrons: 7 },
	{ number: 8, symbol: "O", name: "Oxigênio", mass: "15.999", category: "nonmetal", state: "Gasoso", density: "0.001429", melting: "-218.79", boiling: "-182.95", electronegativity: "3.44", configuration: "[He] 2s² 2p⁴", radius: "48", discovered: "1774", protons: 8, neutrons: 8, electrons: 8 },
	{ number: 9, symbol: "F", name: "Flúor", mass: "18.998", category: "halogen", state: "Gasoso", density: "0.001696", melting: "-219.67", boiling: "-188.11", electronegativity: "3.98", configuration: "[He] 2s² 2p⁵", radius: "42", discovered: "1886", protons: 9, neutrons: 10, electrons: 9 },
	{ number: 10, symbol: "Ne", name: "Neônio", mass: "20.180", category: "noble-gas", state: "Gasoso", density: "0.0008999", melting: "-248.59", boiling: "-246.08", electronegativity: "-", configuration: "[He] 2s² 2p⁶", radius: "38", discovered: "1898", protons: 10, neutrons: 10, electrons: 10 },
	{ number: 11, symbol: "Na", name: "Sódio", mass: "22.990", category: "alkali-metal", state: "Sólido", density: "0.971", melting: "97.72", boiling: "883", electronegativity: "0.93", configuration: "[Ne] 3s¹", radius: "190", discovered: "1807", protons: 11, neutrons: 12, electrons: 11 },
	{ number: 12, symbol: "Mg", name: "Magnésio", mass: "24.305", category: "alkaline-earth-metal", state: "Sólido", density: "1.738", melting: "650", boiling: "1090", electronegativity: "1.31", configuration: "[Ne] 3s²", radius: "145", discovered: "1755", protons: 12, neutrons: 12, electrons: 12 },
	{ number: 13, symbol: "Al", name: "Alumínio", mass: "26.982", category: "post-transition-metal", state: "Sólido", density: "2.698", melting: "660.32", boiling: "2519", electronegativity: "1.61", configuration: "[Ne] 3s² 3p¹", radius: "118", discovered: "1825", protons: 13, neutrons: 14, electrons: 13 },
	{ number: 14, symbol: "Si", name: "Silício", mass: "28.085", category: "metalloid", state: "Sólido", density: "2.3296", melting: "1414", boiling: "2900", electronegativity: "1.90", configuration: "[Ne] 3s² 3p²", radius: "111", discovered: "1824", protons: 14, neutrons: 14, electrons: 14 },
	{ number: 15, symbol: "P", name: "Fósforo", mass: "30.974", category: "nonmetal", state: "Sólido", density: "1.82", melting: "44.15", boiling: "280.5", electronegativity: "2.19", configuration: "[Ne] 3s² 3p³", radius: "98", discovered: "1669", protons: 15, neutrons: 16, electrons: 15 },
	{ number: 16, symbol: "S", name: "Enxofre", mass: "32.06", category: "nonmetal", state: "Sólido", density: "2.067", melting: "115.21", boiling: "444.72", electronegativity: "2.58", configuration: "[Ne] 3s² 3p⁴", radius: "88", discovered: "Antiguidade", protons: 16, neutrons: 16, electrons: 16 },
	{ number: 17, symbol: "Cl", name: "Cloro", mass: "35.45", category: "halogen", state: "Gasoso", density: "0.003214", melting: "-101.5", boiling: "-34.04", electronegativity: "3.16", configuration: "[Ne] 3s² 3p⁵", radius: "79", discovered: "1774", protons: 17, neutrons: 18, electrons: 17 },
	{ number: 18, symbol: "Ar", name: "Argônio", mass: "39.95", category: "noble-gas", state: "Gasoso", density: "0.0017837", melting: "-189.34", boiling: "-185.85", electronegativity: "-", configuration: "[Ne] 3s² 3p⁶", radius: "71", discovered: "1894", protons: 18, neutrons: 22, electrons: 18 },
	{ number: 19, symbol: "K", name: "Potássio", mass: "39.098", category: "alkali-metal", state: "Sólido", density: "0.862", melting: "63.38", boiling: "759", electronegativity: "0.82", configuration: "[Ar] 4s¹", radius: "243", discovered: "1807", protons: 19, neutrons: 20, electrons: 19 },
	{ number: 20, symbol: "Ca", name: "Cálcio", mass: "40.078", category: "alkaline-earth-metal", state: "Sólido", density: "1.54", melting: "842", boiling: "1484", electronegativity: "1.00", configuration: "[Ar] 4s²", radius: "194", discovered: "1808", protons: 20, neutrons: 20, electrons: 20 },
	{ number: 21, symbol: "Sc", name: "Escândio", mass: "44.956", category: "transition-metal", state: "Sólido", density: "2.989", melting: "1541", boiling: "2836", electronegativity: "1.36", configuration: "[Ar] 3d¹ 4s²", radius: "184", discovered: "1879", protons: 21, neutrons: 24, electrons: 21 },
	{ number: 22, symbol: "Ti", name: "Titânio", mass: "47.867", category: "transition-metal", state: "Sólido", density: "4.54", melting: "1668", boiling: "3287", electronegativity: "1.54", configuration: "[Ar] 3d² 4s²", radius: "176", discovered: "1791", protons: 22, neutrons: 26, electrons: 22 },
	{ number: 23, symbol: "V", name: "Vanádio", mass: "50.942", category: "transition-metal", state: "Sólido", density: "6.11", melting: "1910", boiling: "3407", electronegativity: "1.63", configuration: "[Ar] 3d³ 4s²", radius: "171", discovered: "1801", protons: 23, neutrons: 28, electrons: 23 },
	{ number: 24, symbol: "Cr", name: "Cromo", mass: "51.996", category: "transition-metal", state: "Sólido", density: "7.15", melting: "1907", boiling: "2671", electronegativity: "1.66", configuration: "[Ar] 3d⁵ 4s¹", radius: "166", discovered: "1797", protons: 24, neutrons: 28, electrons: 24 },
	{ number: 25, symbol: "Mn", name: "Manganês", mass: "54.938", category: "transition-metal", state: "Sólido", density: "7.44", melting: "1246", boiling: "2061", electronegativity: "1.55", configuration: "[Ar] 3d⁵ 4s²", radius: "161", discovered: "1774", protons: 25, neutrons: 30, electrons: 25 },
	{ number: 26, symbol: "Fe", name: "Ferro", mass: "55.845", category: "transition-metal", state: "Sólido", density: "7.874", melting: "1538", boiling: "2862", electronegativity: "1.83", configuration: "[Ar] 3d⁶ 4s²", radius: "156", discovered: "Antiguidade", protons: 26, neutrons: 30, electrons: 26 },
	{ number: 27, symbol: "Co", name: "Cobalto", mass: "58.933", category: "transition-metal", state: "Sólido", density: "8.86", melting: "1495", boiling: "2927", electronegativity: "1.88", configuration: "[Ar] 3d⁷ 4s²", radius: "152", discovered: "1735", protons: 27, neutrons: 32, electrons: 27 },
	{ number: 28, symbol: "Ni", name: "Níquel", mass: "58.693", category: "transition-metal", state: "Sólido", density: "8.912", melting: "1455", boiling: "2913", electronegativity: "1.91", configuration: "[Ar] 3d⁸ 4s²", radius: "149", discovered: "1751", protons: 28, neutrons: 31, electrons: 28 },
	{ number: 29, symbol: "Cu", name: "Cobre", mass: "63.546", category: "transition-metal", state: "Sólido", density: "8.96", melting: "1084.62", boiling: "2562", electronegativity: "1.90", configuration: "[Ar] 3d¹⁰ 4s¹", radius: "145", discovered: "Antiguidade", protons: 29, neutrons: 35, electrons: 29 },
	{ number: 30, symbol: "Zn", name: "Zinco", mass: "65.38", category: "transition-metal", state: "Sólido", density: "7.134", melting: "419.53", boiling: "907", electronegativity: "1.65", configuration: "[Ar] 3d¹⁰ 4s²", radius: "142", discovered: "1746", protons: 30, neutrons: 35, electrons: 30 },
	{ number: 31, symbol: "Ga", name: "Gálio", mass: "69.723", category: "post-transition-metal", state: "Sólido", density: "5.907", melting: "29.76", boiling: "2204", electronegativity: "1.81", configuration: "[Ar] 3d¹⁰ 4s² 4p¹", radius: "136", discovered: "1875", protons: 31, neutrons: 39, electrons: 31 },
	{ number: 32, symbol: "Ge", name: "Germânio", mass: "72.630", category: "metalloid", state: "Sólido", density: "5.323", melting: "938.25", boiling: "2833", electronegativity: "2.01", configuration: "[Ar] 3d¹⁰ 4s² 4p²", radius: "125", discovered: "1886", protons: 32, neutrons: 41, electrons: 32 },
	{ number: 33, symbol: "As", name: "Arsênio", mass: "74.922", category: "metalloid", state: "Sólido", density: "5.776", melting: "817", boiling: "614", electronegativity: "2.18", configuration: "[Ar] 3d¹⁰ 4s² 4p³", radius: "114", discovered: "1250", protons: 33, neutrons: 42, electrons: 33 },
	{ number: 34, symbol: "Se", name: "Selênio", mass: "78.971", category: "nonmetal", state: "Sólido", density: "4.809", melting: "221", boiling: "685", electronegativity: "2.55", configuration: "[Ar] 3d¹⁰ 4s² 4p⁴", radius: "103", discovered: "1817", protons: 34, neutrons: 45, electrons: 34 },
	{ number: 35, symbol: "Br", name: "Bromo", mass: "79.904", category: "halogen", state: "Líquido", density: "3.122", melting: "-7.2", boiling: "58.8", electronegativity: "2.96", configuration: "[Ar] 3d¹⁰ 4s² 4p⁵", radius: "94", discovered: "1826", protons: 35, neutrons: 45, electrons: 35 },
	{ number: 36, symbol: "Kr", name: "Criptônio", mass: "83.798", category: "noble-gas", state: "Gasoso", density: "0.003733", melting: "-157.36", boiling: "-153.22", electronegativity: "3.00", configuration: "[Ar] 3d¹⁰ 4s² 4p⁶", radius: "88", discovered: "1898", protons: 36, neutrons: 48, electrons: 36 },
	{ number: 37, symbol: "Rb", name: "Rubídio", mass: "85.468", category: "alkali-metal", state: "Sólido", density: "1.532", melting: "39.31", boiling: "688", electronegativity: "0.82", configuration: "[Kr] 5s¹", radius: "265", discovered: "1861", protons: 37, neutrons: 48, electrons: 37 },
	{ number: 38, symbol: "Sr", name: "Estrôncio", mass: "87.62", category: "alkaline-earth-metal", state: "Sólido", density: "2.64", melting: "777", boiling: "1382", electronegativity: "0.95", configuration: "[Kr] 5s²", radius: "219", discovered: "1790", protons: 38, neutrons: 50, electrons: 38 },
	{ number: 39, symbol: "Y", name: "Ítrio", mass: "88.906", category: "transition-metal", state: "Sólido", density: "4.469", melting: "1526", boiling: "3345", electronegativity: "1.22", configuration: "[Kr] 4d¹ 5s²", radius: "212", discovered: "1794", protons: 39, neutrons: 50, electrons: 39 },
	{ number: 40, symbol: "Zr", name: "Zircônio", mass: "91.224", category: "transition-metal", state: "Sólido", density: "6.506", melting: "1855", boiling: "4409", electronegativity: "1.33", configuration: "[Kr] 4d² 5s²", radius: "206", discovered: "1789", protons: 40, neutrons: 51, electrons: 40 },
	{ number: 41, symbol: "Nb", name: "Nióbio", mass: "92.906", category: "transition-metal", state: "Sólido", density: "8.57", melting: "2477", boiling: "4744", electronegativity: "1.6", configuration: "[Kr] 4d⁴ 5s¹", radius: "198", discovered: "1801", protons: 41, neutrons: 52, electrons: 41 },
	{ number: 42, symbol: "Mo", name: "Molibdênio", mass: "95.95", category: "transition-metal", state: "Sólido", density: "10.22", melting: "2623", boiling: "4639", electronegativity: "2.16", configuration: "[Kr] 4d⁵ 5s¹", radius: "190", discovered: "1778", protons: 42, neutrons: 54, electrons: 42 },
	{ number: 43, symbol: "Tc", name: "Tecnécio", mass: "98", category: "transition-metal", state: "Sólido", density: "11.5", melting: "2157", boiling: "4265", electronegativity: "1.9", configuration: "[Kr] 4d⁵ 5s²", radius: "183", discovered: "1937", protons: 43, neutrons: 55, electrons: 43 },
	{ number: 44, symbol: "Ru", name: "Rutênio", mass: "101.07", category: "transition-metal", state: "Sólido", density: "12.37", melting: "2334", boiling: "4150", electronegativity: "2.2", configuration: "[Kr] 4d⁷ 5s¹", radius: "178", discovered: "1844", protons: 44, neutrons: 57, electrons: 44 },
	{ number: 45, symbol: "Rh", name: "Ródio", mass: "102.91", category: "transition-metal", state: "Sólido", density: "12.41", melting: "1964", boiling: "3695", electronegativity: "2.28", configuration: "[Kr] 4d⁸ 5s¹", radius: "173", discovered: "1803", protons: 45, neutrons: 58, electrons: 45 },
	{ number: 46, symbol: "Pd", name: "Paládio", mass: "106.42", category: "transition-metal", state: "Sólido", density: "12.02", melting: "1554.9", boiling: "2963", electronegativity: "2.20", configuration: "[Kr] 4d¹⁰", radius: "169", discovered: "1803", protons: 46, neutrons: 60, electrons: 46 },
	{ number: 47, symbol: "Ag", name: "Prata", mass: "107.87", category: "transition-metal", state: "Sólido", density: "10.501", melting: "961.78", boiling: "2162", electronegativity: "1.93", configuration: "[Kr] 4d¹⁰ 5s¹", radius: "165", discovered: "Antiguidade", protons: 47, neutrons: 61, electrons: 47 },
	{ number: 48, symbol: "Cd", name: "Cádmio", mass: "112.41", category: "transition-metal", state: "Sólido", density: "8.69", melting: "321.07", boiling: "767", electronegativity: "1.69", configuration: "[Kr] 4d¹⁰ 5s²", radius: "161", discovered: "1817", protons: 48, neutrons: 64, electrons: 48 },
	{ number: 49, symbol: "In", name: "Índio", mass: "114.82", category: "post-transition-metal", state: "Sólido", density: "7.31", melting: "156.60", boiling: "2072", electronegativity: "1.78", configuration: "[Kr] 4d¹⁰ 5s² 5p¹", radius: "156", discovered: "1863", protons: 49, neutrons: 66, electrons: 49 },
	{ number: 50, symbol: "Sn", name: "Estanho", mass: "118.71", category: "post-transition-metal", state: "Sólido", density: "7.287", melting: "231.93", boiling: "2602", electronegativity: "1.96", configuration: "[Kr] 4d¹⁰ 5s² 5p²", radius: "145", discovered: "Antiguidade", protons: 50, neutrons: 69, electrons: 50 },
	{ number: 51, symbol: "Sb", name: "Antimônio", mass: "121.76", category: "metalloid", state: "Sólido", density: "6.685", melting: "630.63", boiling: "1587", electronegativity: "2.05", configuration: "[Kr] 4d¹⁰ 5s² 5p³", radius: "133", discovered: "Antiguidade", protons: 51, neutrons: 71, electrons: 51 },
	{ number: 52, symbol: "Te", name: "Telúrio", mass: "127.60", category: "metalloid", state: "Sólido", density: "6.232", melting: "449.51", boiling: "988", electronegativity: "2.1", configuration: "[Kr] 4d¹⁰ 5s² 5p⁴", radius: "123", discovered: "1782", protons: 52, neutrons: 76, electrons: 52 },
	{ number: 53, symbol: "I", name: "Iodo", mass: "126.90", category: "halogen", state: "Sólido", density: "4.93", melting: "113.7", boiling: "184.4", electronegativity: "2.66", configuration: "[Kr] 4d¹⁰ 5s² 5p⁵", radius: "115", discovered: "1811", protons: 53, neutrons: 74, electrons: 53 },
	{ number: 54, symbol: "Xe", name: "Xenônio", mass: "131.29", category: "noble-gas", state: "Gasoso", density: "0.005887", melting: "-111.75", boiling: "-108.09", electronegativity: "2.60", configuration: "[Kr] 4d¹⁰ 5s² 5p⁶", radius: "108", discovered: "1898", protons: 54, neutrons: 77, electrons: 54 },
	{ number: 55, symbol: "Cs", name: "Césio", mass: "132.91", category: "alkali-metal", state: "Sólido", density: "1.873", melting: "28.44", boiling: "671", electronegativity: "0.79", configuration: "[Xe] 6s¹", radius: "298", discovered: "1860", protons: 55, neutrons: 78, electrons: 55 },
	{ number: 56, symbol: "Ba", name: "Bário", mass: "137.33", category: "alkaline-earth-metal", state: "Sólido", density: "3.594", melting: "727", boiling: "1897", electronegativity: "0.89", configuration: "[Xe] 6s²", radius: "253", discovered: "1808", protons: 56, neutrons: 81, electrons: 56 },
	{ number: 57, symbol: "La", name: "Lantânio", mass: "138.91", category: "lanthanide", state: "Sólido", density: "6.145", melting: "920", boiling: "3464", electronegativity: "1.1", configuration: "[Xe] 5d¹ 6s²", radius: "-", discovered: "1839", protons: 57, neutrons: 82, electrons: 57 },
	{ number: 58, symbol: "Ce", name: "Cério", mass: "140.12", category: "lanthanide", state: "Sólido", density: "6.770", melting: "795", boiling: "3443", electronegativity: "1.12", configuration: "[Xe] 4f¹ 5d¹ 6s²", radius: "-", discovered: "1803", protons: 58, neutrons: 82, electrons: 58 },
	{ number: 59, symbol: "Pr", name: "Praseodímio", mass: "140.91", category: "lanthanide", state: "Sólido", density: "6.773", melting: "935", boiling: "3520", electronegativity: "1.13", configuration: "[Xe] 4f³ 6s²", radius: "-", discovered: "1885", protons: 59, neutrons: 82, electrons: 59 },
	{ number: 60, symbol: "Nd", name: "Neodímio", mass: "144.24", category: "lanthanide", state: "Sólido", density: "7.007", melting: "1024", boiling: "3074", electronegativity: "1.14", configuration: "[Xe] 4f⁴ 6s²", radius: "-", discovered: "1885", protons: 60, neutrons: 84, electrons: 60 },
	{ number: 61, symbol: "Pm", name: "Promécio", mass: "145", category: "lanthanide", state: "Sólido", density: "7.26", melting: "1042", boiling: "3000", electronegativity: "1.13", configuration: "[Xe] 4f⁵ 6s²", radius: "-", discovered: "1945", protons: 61, neutrons: 84, electrons: 61 },
	{ number: 62, symbol: "Sm", name: "Samário", mass: "150.36", category: "lanthanide", state: "Sólido", density: "7.52", melting: "1074", boiling: "1794", electronegativity: "1.17", configuration: "[Xe] 4f⁶ 6s²", radius: "-", discovered: "1879", protons: 62, neutrons: 88, electrons: 62 },
	{ number: 63, symbol: "Eu", name: "Európio", mass: "151.96", category: "lanthanide", state: "Sólido", density: "5.243", melting: "822", boiling: "1529", electronegativity: "1.2", configuration: "[Xe] 4f⁷ 6s²", radius: "-", discovered: "1901", protons: 63, neutrons: 89, electrons: 63 },
	{ number: 64, symbol: "Gd", name: "Gadolínio", mass: "157.25", category: "lanthanide", state: "Sólido", density: "7.895", melting: "1313", boiling: "3273", electronegativity: "1.2", configuration: "[Xe] 4f⁷ 5d¹ 6s²", radius: "-", discovered: "1880", protons: 64, neutrons: 93, electrons: 64 },
	{ number: 65, symbol: "Tb", name: "Térbio", mass: "158.93", category: "lanthanide", state: "Sólido", density: "8.229", melting: "1356", boiling: "3230", electronegativity: "1.2", configuration: "[Xe] 4f⁹ 6s²", radius: "-", discovered: "1843", protons: 65, neutrons: 94, electrons: 65 },
	{ number: 66, symbol: "Dy", name: "Disprósio", mass: "162.50", category: "lanthanide", state: "Sólido", density: "8.55", melting: "1412", boiling: "2567", electronegativity: "1.22", configuration: "[Xe] 4f¹⁰ 6s²", radius: "-", discovered: "1886", protons: 66, neutrons: 97, electrons: 66 },
	{ number: 67, symbol: "Ho", name: "Hólmio", mass: "164.93", category: "lanthanide", state: "Sólido", density: "8.795", melting: "1474", boiling: "2700", electronegativity: "1.23", configuration: "[Xe] 4f¹¹ 6s²", radius: "-", discovered: "1878", protons: 67, neutrons: 98, electrons: 67 },
	{ number: 68, symbol: "Er", name: "Érbio", mass: "167.26", category: "lanthanide", state: "Sólido", density: "9.066", melting: "1529", boiling: "2868", electronegativity: "1.24", configuration: "[Xe] 4f¹² 6s²", radius: "-", discovered: "1842", protons: 68, neutrons: 99, electrons: 68 },
	{ number: 69, symbol: "Tm", name: "Túlio", mass: "168.93", category: "lanthanide", state: "Sólido", density: "9.321", melting: "1545", boiling: "1950", electronegativity: "1.25", configuration: "[Xe] 4f¹³ 6s²", radius: "-", discovered: "1879", protons: 69, neutrons: 100, electrons: 69 },
	{ number: 70, symbol: "Yb", name: "Itérbio", mass: "173.05", category: "lanthanide", state: "Sólido", density: "6.965", melting: "819", boiling: "1196", electronegativity: "1.1", configuration: "[Xe] 4f¹⁴ 6s²", radius: "-", discovered: "1878", protons: 70, neutrons: 103, electrons: 70 },
	{ number: 71, symbol: "Lu", name: "Lutécio", mass: "174.97", category: "lanthanide", state: "Sólido", density: "9.84", melting: "1663", boiling: "3402", electronegativity: "1.27", configuration: "[Xe] 4f¹⁴ 5d¹ 6s²", radius: "-", discovered: "1907", protons: 71, neutrons: 104, electrons: 71 },
	{ number: 72, symbol: "Hf", name: "Háfnio", mass: "178.49", category: "transition-metal", state: "Sólido", density: "13.31", melting: "2233", boiling: "4603", electronegativity: "1.3", configuration: "[Xe] 4f¹⁴ 5d² 6s²", radius: "-", discovered: "1923", protons: 72, neutrons: 106, electrons: 72 },
	{ number: 73, symbol: "Ta", name: "Tântalo", mass: "180.95", category: "transition-metal", state: "Sólido", density: "16.654", melting: "3017", boiling: "5458", electronegativity: "1.5", configuration: "[Xe] 4f¹⁴ 5d³ 6s²", radius: "-", discovered: "1802", protons: 73, neutrons: 108, electrons: 73 },
	{ number: 74, symbol: "W", name: "Tungstênio", mass: "183.84", category: "transition-metal", state: "Sólido", density: "19.25", melting: "3422", boiling: "5555", electronegativity: "2.36", configuration: "[Xe] 4f¹⁴ 5d⁴ 6s²", radius: "-", discovered: "1783", protons: 74, neutrons: 110, electrons: 74 },
	{ number: 75, symbol: "Re", name: "Rênio", mass: "186.21", category: "transition-metal", state: "Sólido", density: "21.02", melting: "3186", boiling: "5596", electronegativity: "1.9", configuration: "[Xe] 4f¹⁴ 5d⁵ 6s²", radius: "-", discovered: "1925", protons: 75, neutrons: 111, electrons: 75 },
	{ number: 76, symbol: "Os", name: "Ósmio", mass: "190.23", category: "transition-metal", state: "Sólido", density: "22.61", melting: "3033", boiling: "5012", electronegativity: "2.2", configuration: "[Xe] 4f¹⁴ 5d⁶ 6s²", radius: "-", discovered: "1803", protons: 76, neutrons: 114, electrons: 76 },
	{ number: 77, symbol: "Ir", name: "Irídio", mass: "192.22", category: "transition-metal", state: "Sólido", density: "22.56", melting: "2446", boiling: "4428", electronegativity: "2.20", configuration: "[Xe] 4f¹⁴ 5d⁷ 6s²", radius: "-", discovered: "1803", protons: 77, neutrons: 115, electrons: 77 },
	{ number: 78, symbol: "Pt", name: "Platina", mass: "195.08", category: "transition-metal", state: "Sólido", density: "21.46", melting: "1768.3", boiling: "3825", electronegativity: "2.28", configuration: "[Xe] 4f¹⁴ 5d⁹ 6s¹", radius: "-", discovered: "1735", protons: 78, neutrons: 117, electrons: 78 },
	{ number: 79, symbol: "Au", name: "Ouro", mass: "196.97", category: "transition-metal", state: "Sólido", density: "19.282", melting: "1064.18", boiling: "2856", electronegativity: "2.54", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", radius: "-", discovered: "Antiguidade", protons: 79, neutrons: 118, electrons: 79 },
	{ number: 80, symbol: "Hg", name: "Mercúrio", mass: "200.59", category: "transition-metal", state: "Líquido", density: "13.5336", melting: "-38.83", boiling: "356.73", electronegativity: "2.00", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", radius: "-", discovered: "Antiguidade", protons: 80, neutrons: 121, electrons: 80 },
	{ number: 81, symbol: "Tl", name: "Tálio", mass: "204.38", category: "post-transition-metal", state: "Sólido", density: "11.85", melting: "304", boiling: "1473", electronegativity: "1.62", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", radius: "-", discovered: "1861", protons: 81, neutrons: 123, electrons: 81 },
	{ number: 82, symbol: "Pb", name: "Chumbo", mass: "207.2", category: "post-transition-metal", state: "Sólido", density: "11.342", melting: "327.46", boiling: "1749", electronegativity: "1.87", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", radius: "-", discovered: "Antiguidade", protons: 82, neutrons: 125, electrons: 82 },
	{ number: 83, symbol: "Bi", name: "Bismuto", mass: "208.98", category: "post-transition-metal", state: "Sólido", density: "9.807", melting: "271.40", boiling: "1564", electronegativity: "2.02", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", radius: "-", discovered: "1753", protons: 83, neutrons: 126, electrons: 83 },
	{ number: 84, symbol: "Po", name: "Polônio", mass: "209", category: "metalloid", state: "Sólido", density: "9.32", melting: "254", boiling: "962", electronegativity: "2.0", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", radius: "-", discovered: "1898", protons: 84, neutrons: 125, electrons: 84 },
	{ number: 85, symbol: "At", name: "Astato", mass: "210", category: "halogen", state: "Sólido", density: "7", melting: "302", boiling: "337", electronegativity: "2.2", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", radius: "-", discovered: "1940", protons: 85, neutrons: 125, electrons: 85 },
	{ number: 86, symbol: "Rn", name: "Radônio", mass: "222", category: "noble-gas", state: "Gasoso", density: "0.00973", melting: "-71", boiling: "-61.7", electronegativity: "2.2", configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", radius: "-", discovered: "1900", protons: 86, neutrons: 136, electrons: 86 },
	{ number: 87, symbol: "Fr", name: "Frâncio", mass: "223", category: "alkali-metal", state: "Sólido", density: "1.87", melting: "27", boiling: "677", electronegativity: "0.7", configuration: "[Rn] 7s¹", radius: "-", discovered: "1939", protons: 87, neutrons: 136, electrons: 87 },
	{ number: 88, symbol: "Ra", name: "Rádio", mass: "226", category: "alkaline-earth-metal", state: "Sólido", density: "5.5", melting: "700", boiling: "1737", electronegativity: "0.9", configuration: "[Rn] 7s²", radius: "-", discovered: "1898", protons: 88, neutrons: 138, electrons: 88 },
	{ number: 89, symbol: "Ac", name: "Actínio", mass: "227", category: "actinide", state: "Sólido", density: "10.07", melting: "1050", boiling: "3200", electronegativity: "1.1", configuration: "[Rn] 6d¹ 7s²", radius: "-", discovered: "1899", protons: 89, neutrons: 138, electrons: 89 },
	{ number: 90, symbol: "Th", name: "Tório", mass: "232.04", category: "actinide", state: "Sólido", density: "11.72", melting: "1750", boiling: "4788", electronegativity: "1.3", configuration: "[Rn] 6d² 7s²", radius: "-", discovered: "1829", protons: 90, neutrons: 142, electrons: 90 },
	{ number: 91, symbol: "Pa", name: "Protactínio", mass: "231.04", category: "actinide", state: "Sólido", density: "15.37", melting: "1572", boiling: "4000", electronegativity: "1.5", configuration: "[Rn] 5f² 6d¹ 7s²", radius: "-", discovered: "1913", protons: 91, neutrons: 140, electrons: 91 },
	{ number: 92, symbol: "U", name: "Urânio", mass: "238.03", category: "actinide", state: "Sólido", density: "18.95", melting: "1132.2", boiling: "4131", electronegativity: "1.38", configuration: "[Rn] 5f³ 6d¹ 7s²", radius: "-", discovered: "1789", protons: 92, neutrons: 146, electrons: 92 },
	{ number: 93, symbol: "Np", name: "Netúnio", mass: "237", category: "actinide", state: "Sólido", density: "20.45", melting: "644", boiling: "4000", electronegativity: "1.36", configuration: "[Rn] 5f⁴ 6d¹ 7s²", radius: "-", discovered: "1940", protons: 93, neutrons: 144, electrons: 93 },
	{ number: 94, symbol: "Pu", name: "Plutônio", mass: "244", category: "actinide", state: "Sólido", density: "19.84", melting: "639.4", boiling: "3228", electronegativity: "1.28", configuration: "[Rn] 5f⁶ 7s²", radius: "-", discovered: "1940", protons: 94, neutrons: 150, electrons: 94 },
	{ number: 95, symbol: "Am", name: "Amerício", mass: "243", category: "actinide", state: "Sólido", density: "13.69", melting: "1176", boiling: "2011", electronegativity: "1.13", configuration: "[Rn] 5f⁷ 7s²", radius: "-", discovered: "1944", protons: 95, neutrons: 148, electrons: 95 },
	{ number: 96, symbol: "Cm", name: "Cúrio", mass: "247", category: "actinide", state: "Sólido", density: "13.51", melting: "1345", boiling: "3110", electronegativity: "1.28", configuration: "[Rn] 5f⁷ 6d¹ 7s²", radius: "-", discovered: "1944", protons: 96, neutrons: 151, electrons: 96 },
	{ number: 97, symbol: "Bk", name: "Berquélio", mass: "247", category: "actinide", state: "Sólido", density: "14.79", melting: "986", boiling: "2627", electronegativity: "1.3", configuration: "[Rn] 5f⁹ 7s²", radius: "-", discovered: "1949", protons: 97, neutrons: 150, electrons: 97 },
	{ number: 98, symbol: "Cf", name: "Califórnio", mass: "251", category: "actinide", state: "Sólido", density: "15.1", melting: "900", boiling: "1470", electronegativity: "1.3", configuration: "[Rn] 5f¹⁰ 7s²", radius: "-", discovered: "1950", protons: 98, neutrons: 153, electrons: 98 },
	{ number: 99, symbol: "Es", name: "Einstênio", mass: "252", category: "actinide", state: "Sólido", density: "8.84", melting: "860", boiling: "996", electronegativity: "1.3", configuration: "[Rn] 5f¹¹ 7s²", radius: "-", discovered: "1952", protons: 99, neutrons: 153, electrons: 99 },
	{ number: 100, symbol: "Fm", name: "Férmio", mass: "257", category: "actinide", state: "Sólido", density: "-", melting: "1527", boiling: "-", electronegativity: "1.3", configuration: "[Rn] 5f¹² 7s²", radius: "-", discovered: "1952", protons: 100, neutrons: 157, electrons: 100 },
	{ number: 101, symbol: "Md", name: "Mendelévio", mass: "258", category: "actinide", state: "Sólido", density: "-", melting: "827", boiling: "-", electronegativity: "1.3", configuration: "[Rn] 5f¹³ 7s²", radius: "-", discovered: "1955", protons: 101, neutrons: 157, electrons: 101 },
	{ number: 102, symbol: "No", name: "Nobélio", mass: "259", category: "actinide", state: "Sólido", density: "-", melting: "827", boiling: "-", electronegativity: "1.3", configuration: "[Rn] 5f¹⁴ 7s²", radius: "-", discovered: "1958", protons: 102, neutrons: 157, electrons: 102 },
	{ number: 103, symbol: "Lr", name: "Laurêncio", mass: "266", category: "actinide", state: "Sólido", density: "-", melting: "1627", boiling: "-", electronegativity: "1.3", configuration: "[Rn] 5f¹⁴ 7s² 7p¹", radius: "-", discovered: "1961", protons: 103, neutrons: 163, electrons: 103 },
	{ number: 104, symbol: "Rf", name: "Rutherfórdio", mass: "267", category: "transition-metal", state: "Sólido", density: "23.2", melting: "2100", boiling: "5500", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d² 7s²", radius: "-", discovered: "1964", protons: 104, neutrons: 163, electrons: 104 },
	{ number: 105, symbol: "Db", name: "Dúbnio", mass: "268", category: "transition-metal", state: "Sólido", density: "29.3", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d³ 7s²", radius: "-", discovered: "1967", protons: 105, neutrons: 163, electrons: 105 },
	{ number: 106, symbol: "Sg", name: "Seabórgio", mass: "269", category: "transition-metal", state: "Sólido", density: "35.0", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁴ 7s²", radius: "-", discovered: "1974", protons: 106, neutrons: 163, electrons: 106 },
	{ number: 107, symbol: "Bh", name: "Bóhrio", mass: "270", category: "transition-metal", state: "Sólido", density: "37.1", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁵ 7s²", radius: "-", discovered: "1981", protons: 107, neutrons: 163, electrons: 107 },
	{ number: 108, symbol: "Hs", name: "Hássio", mass: "269", category: "transition-metal", state: "Sólido", density: "40.7", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁶ 7s²", radius: "-", discovered: "1984", protons: 108, neutrons: 161, electrons: 108 },
	{ number: 109, symbol: "Mt", name: "Meitnério", mass: "278", category: "transition-metal", state: "Sólido", density: "37.4", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁷ 7s²", radius: "-", discovered: "1982", protons: 109, neutrons: 169, electrons: 109 },
	{ number: 110, symbol: "Ds", name: "Darmstádtio", mass: "281", category: "transition-metal", state: "Sólido", density: "34.8", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁸ 7s²", radius: "-", discovered: "1994", protons: 110, neutrons: 171, electrons: 110 },
	{ number: 111, symbol: "Rg", name: "Roentgênio", mass: "282", category: "transition-metal", state: "Sólido", density: "28.7", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d⁹ 7s²", radius: "-", discovered: "1994", protons: 111, neutrons: 171, electrons: 111 },
	{ number: 112, symbol: "Cn", name: "Copernício", mass: "285", category: "transition-metal", state: "Líquido", density: "23.7", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", radius: "-", discovered: "1996", protons: 112, neutrons: 173, electrons: 112 },
	{ number: 113, symbol: "Nh", name: "Nihônio", mass: "286", category: "post-transition-metal", state: "Sólido", density: "16", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", radius: "-", discovered: "2003", protons: 113, neutrons: 173, electrons: 113 },
	{ number: 114, symbol: "Fl", name: "Fleróvio", mass: "289", category: "post-transition-metal", state: "Líquido", density: "14", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", radius: "-", discovered: "1998", protons: 114, neutrons: 175, electrons: 114 },
	{ number: 115, symbol: "Mc", name: "Moscóvio", mass: "290", category: "post-transition-metal", state: "Sólido", density: "13.5", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", radius: "-", discovered: "2003", protons: 115, neutrons: 175, electrons: 115 },
	{ number: 116, symbol: "Lv", name: "Livermório", mass: "293", category: "post-transition-metal", state: "Sólido", density: "12.9", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", radius: "-", discovered: "2000", protons: 116, neutrons: 177, electrons: 116 },
	{ number: 117, symbol: "Ts", name: "Tenessino", mass: "294", category: "halogen", state: "Sólido", density: "7.2", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", radius: "-", discovered: "2010", protons: 117, neutrons: 177, electrons: 117 },
	{ number: 118, symbol: "Og", name: "Oganessônio", mass: "294", category: "noble-gas", state: "Gasoso", density: "5.0", melting: "-", boiling: "-", electronegativity: "-", configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", radius: "-", discovered: "2002", protons: 118, neutrons: 176, electrons: 118 }
];

// Variáveis globais
let currentElement = elements[0]; // Mudar de periodicTable para elements
let scene, camera, renderer, controls;
let animationId = null;
let isAnimating = true;
let viewMode = 'orbital';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializePeriodicTable();
    initSearch();
    init3DViewer();
    updateElementInfo();
    updateAtomInfo();
});

// ====== INICIALIZAR TABELA PERIÓDICA ======
function initializePeriodicTable() {
    const table = document.getElementById('periodicTable');
    table.innerHTML = '';
    
    elements.forEach((element, index) => { // Mudar de periodicTable para elements
        const elementItem = document.createElement('div');
        elementItem.className = `element-item ${index === 0 ? 'active' : ''}`;
        elementItem.innerHTML = `
            <div class="element-number">${element.number}</div>
            <div class="element-symbol">${element.symbol}</div>
            <div class="element-name">${element.name}</div>
        `;
        
        elementItem.addEventListener('click', () => selectElement(element, elementItem));
        table.appendChild(elementItem);
    });
}

// ====== SISTEMA DE BUSCA ======
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const elements = document.querySelectorAll('.element-item'); // Isso é uma variável local, não conflita
        
        elements.forEach(element => {
            const symbol = element.querySelector('.element-symbol').textContent.toLowerCase();
            const name = element.querySelector('.element-name').textContent.toLowerCase();
            const number = element.querySelector('.element-number').textContent;
            
            const matches = symbol.includes(searchTerm) || 
                          name.includes(searchTerm) || 
                          number.includes(searchTerm);
            
            element.style.display = matches ? 'flex' : 'none';
        });
    });
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
}

// ====== SELECIONAR ELEMENTO ======
function selectElement(element, elementItem) {
    currentElement = element;
    
    document.querySelectorAll('.element-item').forEach(item => {
        item.classList.remove('active');
    });
    elementItem.classList.add('active');
    
    updateElementInfo();
    updateAtomInfo();
    update3DViewer();
}

// ====== ATUALIZAR INFORMAÇÕES DO ELEMENTO ======
function updateElementInfo() {
    if (!currentElement) return;
    
    document.getElementById('infoName').textContent = currentElement.name;
    document.getElementById('infoSymbol').textContent = currentElement.symbol;
    document.getElementById('infoNumber').textContent = currentElement.number;
    document.getElementById('infoMass').textContent = currentElement.mass + ' u';
    
    document.getElementById('infoState').textContent = currentElement.state;
    document.getElementById('infoDensity').textContent = currentElement.density + ' g/cm³';
    document.getElementById('infoMelting').textContent = currentElement.melting + ' °C';
    document.getElementById('infoBoiling').textContent = currentElement.boiling + ' °C';
    
    document.getElementById('infoElectronegativity').textContent = currentElement.electronegativity;
    document.getElementById('infoConfiguration').textContent = currentElement.configuration;
    document.getElementById('infoRadius').textContent = currentElement.radius + ' pm';
    document.getElementById('infoDiscovered').textContent = currentElement.discovered;
}

// ====== ATUALIZAR INFORMAÇÕES DO ÁTOMO ======
function updateAtomInfo() {
    if (!currentElement) return;
    
    document.getElementById('protonCount').textContent = currentElement.protons;
    document.getElementById('neutronCount').textContent = currentElement.neutrons;
    document.getElementById('electronCount').textContent = currentElement.electrons;
    
    const description = `O ${currentElement.name} (${currentElement.symbol}) possui ${currentElement.protons} prótons, ${currentElement.neutrons} nêutrons e ${currentElement.electrons} elétrons. Sua configuração eletrônica é ${currentElement.configuration}.`;
    document.getElementById('structureDescription').textContent = description;
}

// ====== INICIALIZAR VISUALIZADOR 3D ======
function init3DViewer() {
    const container = document.getElementById('atom3DCanvas');
    if (!container) return;
    
    // Criar cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    
    // Configurar câmera
    const width = container.parentElement.clientWidth;
    const height = container.parentElement.clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 25);
    
    // Configurar renderizador
    renderer = new THREE.WebGLRenderer({ 
        canvas: container,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height, false);
    
    // Configurar controles
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    
    // Adicionar luzes
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    
    const point = new THREE.PointLight(0xffffff, 1.2);
    point.position.set(10, 10, 15);
    scene.add(point);
    
    const back = new THREE.PointLight(0x10b981, 0.6);
    back.position.set(-15, -10, -10);
    scene.add(back);
    
    // Redimensionamento responsivo
    window.addEventListener('resize', onWindowResize);
    
    // Criar átomo inicial
    update3DViewer();
    
    // Iniciar animação
    animate3D();
}

function onWindowResize() {
    if (!renderer || !camera) return;
    const container = document.getElementById('atom3DCanvas');
    if (!container) return;
    
    const width = container.parentElement.clientWidth;
    const height = container.parentElement.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}

function animate3D() {
    animationId = requestAnimationFrame(animate3D);
    
    if (isAnimating) {
        scene.children.forEach(child => {
            if (child.userData.isAtomGroup) {
                animateAtomGroup(child);
            }
        });
    }
    
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
}

function animateAtomGroup(atomGroup) {
    atomGroup.rotation.y += 0.005;
    
    for (let i = 1; i < atomGroup.children.length; i++) {
        const child = atomGroup.children[i];
        if (child.userData.orbitRadius !== undefined) {
            child.userData.angle += child.userData.speed;
            child.position.x = Math.cos(child.userData.angle) * child.userData.orbitRadius;
            child.position.z = Math.sin(child.userData.angle) * child.userData.orbitRadius;
        }
    }
}

function update3DViewer() {
    if (!scene || !currentElement) return;
    
    // Limpar cena
    scene.children.slice().forEach(child => {
        if (child.type !== 'AmbientLight' && child.type !== 'PointLight') {
            scene.remove(child);
        }
    });
    
    // Criar átomo
    const atomGroup = createAtomGroup(currentElement);
    scene.add(atomGroup);
}

function createAtomGroup(element) {
    const group = new THREE.Group();
    group.userData.isAtomGroup = true;
    
    // Núcleo
    const nucleusGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ 
        color: getAtomColor(element.symbol),
        emissive: getAtomEmissive(element.symbol),
        shininess: 100
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleus);
    
    if (viewMode === 'orbital') {
        createOrbitalView(group, element);
    } else if (viewMode === 'cloud') {
        createCloudView(group, element);
    } else if (viewMode === 'nucleus') {
        createNucleusView(group, element);
    }
    
    return group;
}

function createOrbitalView(group, element) {
    const electronCount = element.electrons;
    const shells = calculateElectronShells(electronCount);
    
    shells.forEach((shell, idx) => {
        const orbitRadius = 2.5 + idx * 1.2;
        
        // Órbita visual
        const orbitGeometry = new THREE.RingGeometry(orbitRadius - 0.05, orbitRadius + 0.05, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x444444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbitMesh.rotation.x = Math.PI / 2;
        group.add(orbitMesh);
        
        // Elétrons
        for (let i = 0; i < shell; i++) {
            const angle = (i / shell) * Math.PI * 2;
            const electronGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const electronMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x10b981,
                emissive: 0x003322,
                shininess: 100
            });
            const electron = new THREE.Mesh(electronGeometry, electronMaterial);
            
            electron.userData.orbitRadius = orbitRadius;
            electron.userData.angle = angle;
            electron.userData.speed = 0.015 + Math.random() * 0.01;
            
            electron.position.x = Math.cos(angle) * orbitRadius;
            electron.position.z = Math.sin(angle) * orbitRadius;
            
            group.add(electron);
        }
    });
}

function createCloudView(group, element) {
    const cloudRadius = 5.0;
    const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x10b981,
        transparent: true,
        opacity: 0.1
    });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    group.add(cloud);
    
    const electronCount = Math.min(element.electrons, 30);
    const electronGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const electronMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x10b981,
        emissive: 0x003322,
        shininess: 100
    });
    
    for (let i = 0; i < electronCount; i++) {
        const electron = new THREE.Mesh(electronGeometry, electronMaterial);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = cloudRadius * 0.8 * Math.random();
        
        electron.position.x = r * Math.sin(phi) * Math.cos(theta);
        electron.position.y = r * Math.sin(phi) * Math.sin(theta);
        electron.position.z = r * Math.cos(phi);
        
        group.add(electron);
    }
}

function createNucleusView(group, element) {
    const particleGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    
    // Prótons
    const protonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff4444,
        shininess: 80
    });
    const protonCount = Math.min(element.protons, 30);
    for (let i = 0; i < protonCount; i++) {
        const proton = new THREE.Mesh(particleGeometry, protonMaterial);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.random() * 1.5;
        
        proton.position.x = r * Math.sin(phi) * Math.cos(theta);
        proton.position.y = r * Math.sin(phi) * Math.sin(theta);
        proton.position.z = r * Math.cos(phi);
        
        group.add(proton);
    }
    
    // Nêutrons
    const neutronMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xaaaaaa,
        shininess: 80
    });
    const neutronCount = Math.min(element.neutrons, 30);
    for (let i = 0; i < neutronCount; i++) {
        const neutron = new THREE.Mesh(particleGeometry, neutronMaterial);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.random() * 1.5;
        
        neutron.position.x = r * Math.sin(phi) * Math.cos(theta);
        neutron.position.y = r * Math.sin(phi) * Math.sin(theta);
        neutron.position.z = r * Math.cos(phi);
        
        group.add(neutron);
    }
}

function calculateElectronShells(electrons) {
    const shells = [];
    let remaining = electrons;
    const maxPerShell = [2, 8, 18, 32, 32, 18, 8, 2];
    
    for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
        const electronsInShell = Math.min(remaining, maxPerShell[i]);
        shells.push(electronsInShell);
        remaining -= electronsInShell;
    }
    return shells;
}

function getAtomColor(symbol) {
	const colors = {
		'H': 0xffffff, 'He': 0xffd700, 'Li': 0xff6b6b, 'Be': 0x4ecdc4,
		'B': 0xff9f40, 'C': 0x333333, 'N': 0x0066ff, 'O': 0xff0000,
		'F': 0x90ee90, 'Ne': 0xff69b4, 'Na': 0xff6b6b, 'Mg': 0x4ecdc4,
		'Al': 0xc0c0c0, 'Si': 0x808080, 'P': 0xffa500, 'S': 0xffff00,
		'Cl': 0x00ff00, 'Ar': 0x87ceeb, 'K': 0xff6b6b, 'Ca': 0x4ecdc4,
		'Sc': 0x9370db, 'Ti': 0x708090, 'V': 0x9370db, 'Cr': 0x708090,
		'Mn': 0x9370db, 'Fe': 0xff8c00, 'Co': 0x9370db, 'Ni': 0x708090,
		'Cu': 0xb87333, 'Zn': 0x708090, 'Ga': 0x9370db, 'Ge': 0x708090,
		'As': 0x9370db, 'Se': 0xffa500, 'Br': 0x8b4513, 'Kr': 0x87ceeb,
		'Rb': 0xff6b6b, 'Sr': 0x4ecdc4, 'Y': 0x9370db, 'Zr': 0x708090,
		'Nb': 0x9370db, 'Mo': 0x708090, 'Tc': 0x9370db, 'Ru': 0x708090,
		'Rh': 0x9370db, 'Pd': 0x708090, 'Ag': 0xc0c0c0, 'Cd': 0x708090,
		'In': 0x9370db, 'Sn': 0x708090, 'Sb': 0x9370db, 'Te': 0xffa500,
		'I': 0x8b4513, 'Xe': 0x87ceeb, 'Cs': 0xff6b6b, 'Ba': 0x4ecdc4,
		'La': 0x9370db, 'Ce': 0x9370db, 'Pr': 0x9370db, 'Nd': 0x9370db,
		'Pm': 0x9370db, 'Sm': 0x9370db, 'Eu': 0x9370db, 'Gd': 0x9370db,
		'Tb': 0x9370db, 'Dy': 0x9370db, 'Ho': 0x9370db, 'Er': 0x9370db,
		'Tm': 0x9370db, 'Yb': 0x9370db, 'Lu': 0x9370db, 'Hf': 0x708090,
		'Ta': 0x9370db, 'W': 0x708090, 'Re': 0x9370db, 'Os': 0x708090,
		'Ir': 0x9370db, 'Pt': 0x708090, 'Au': 0xffd700, 'Hg': 0x708090,
		'Tl': 0x9370db, 'Pb': 0x708090, 'Bi': 0x9370db, 'Po': 0x9370db,
		'At': 0x9370db, 'Rn': 0x87ceeb, 'Fr': 0xff6b6b, 'Ra': 0x4ecdc4,
		'Ac': 0x9370db, 'Th': 0x9370db, 'Pa': 0x9370db, 'U': 0x9370db,
		'Np': 0x9370db, 'Pu': 0x9370db, 'Am': 0x9370db, 'Cm': 0x9370db,
		'Bk': 0x9370db, 'Cf': 0x9370db, 'Es': 0x9370db, 'Fm': 0x9370db,
		'Md': 0x9370db, 'No': 0x9370db, 'Lr': 0x9370db, 'Rf': 0x708090,
		'Db': 0x9370db, 'Sg': 0x708090, 'Bh': 0x9370db, 'Hs': 0x708090,
		'Mt': 0x9370db, 'Ds': 0x708090, 'Rg': 0x9370db, 'Cn': 0x708090,
		'Nh': 0x9370db, 'Fl': 0x708090, 'Mc': 0x9370db, 'Lv': 0x708090,
		'Ts': 0x9370db, 'Og': 0x87ceeb
	};
	return colors[symbol] || 0x888888;
}

// Obter cor emissiva do átomo
function getAtomEmissive(symbol) {
	const emissive = {
		'H': 0x222222, 'He': 0x444400, 'Li': 0x442222, 'Be': 0x224444,
		'B': 0x444422, 'C': 0x111111, 'N': 0x000044, 'O': 0x440000,
		'F': 0x224422, 'Ne': 0x442244, 'Na': 0x442222, 'Mg': 0x224444,
		'Al': 0x444444, 'Si': 0x222222, 'P': 0x444422, 'S': 0x444400,
		'Cl': 0x004400, 'Ar': 0x224444, 'K': 0x442222, 'Ca': 0x224444,
		'Sc': 0x442244, 'Ti': 0x222222, 'V': 0x442244, 'Cr': 0x222222,
		'Mn': 0x442244, 'Fe': 0x444422, 'Co': 0x442244, 'Ni': 0x222222,
		'Cu': 0x444422, 'Zn': 0x222222, 'Ga': 0x442244, 'Ge': 0x222222,
		'As': 0x442244, 'Se': 0x444422, 'Br': 0x442222, 'Kr': 0x224444,
		'Rb': 0x442222, 'Sr': 0x224444, 'Y': 0x442244, 'Zr': 0x222222,
		'Nb': 0x442244, 'Mo': 0x222222, 'Tc': 0x442244, 'Ru': 0x222222,
		'Rh': 0x442244, 'Pd': 0x222222, 'Ag': 0x444444, 'Cd': 0x222222,
		'In': 0x442244, 'Sn': 0x222222, 'Sb': 0x442244, 'Te': 0x444422,
		'I': 0x442222, 'Xe': 0x224444, 'Cs': 0x442222, 'Ba': 0x224444,
		'La': 0x442244, 'Ce': 0x442244, 'Pr': 0x442244, 'Nd': 0x442244,
		'Pm': 0x442244, 'Sm': 0x442244, 'Eu': 0x442244, 'Gd': 0x442244,
		'Tb': 0x442244, 'Dy': 0x442244, 'Ho': 0x442244, 'Er': 0x442244,
		'Tm': 0x442244, 'Yb': 0x442244, 'Lu': 0x442244, 'Hf': 0x222222,
		'Ta': 0x442244, 'W': 0x222222, 'Re': 0x442244, 'Os': 0x222222,
		'Ir': 0x442244, 'Pt': 0x222222, 'Au': 0x444400, 'Hg': 0x222222,
		'Tl': 0x442244, 'Pb': 0x222222, 'Bi': 0x442244, 'Po': 0x442244,
		'At': 0x442244, 'Rn': 0x224444, 'Fr': 0x442222, 'Ra': 0x224444,
		'Ac': 0x442244, 'Th': 0x442244, 'Pa': 0x442244, 'U': 0x442244,
		'Np': 0x442244, 'Pu': 0x442244, 'Am': 0x442244, 'Cm': 0x442244,
		'Bk': 0x442244, 'Cf': 0x442244, 'Es': 0x442244, 'Fm': 0x442244,
		'Md': 0x442244, 'No': 0x442244, 'Lr': 0x442244, 'Rf': 0x222222,
		'Db': 0x442244, 'Sg': 0x222222, 'Bh': 0x442244, 'Hs': 0x222222,
		'Mt': 0x442244, 'Ds': 0x222222, 'Rg': 0x442244, 'Cn': 0x222222,
		'Nh': 0x442244, 'Fl': 0x222222, 'Mc': 0x442244, 'Lv': 0x222222,
		'Ts': 0x442244, 'Og': 0x224444
	};
	return emissive[symbol] || 0x222222;
}

// ====== CONTROLES DA VISUALIZAÇÃO ======
function setViewMode(mode, btn) {
    viewMode = mode;
    
    // Atualizar botões
    document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    // Atualizar visualização
    update3DViewer();
}

function toggleAnimation(btn) {
    isAnimating = !isAnimating;
    
    // Atualizar botão
    if (isAnimating) {
        btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pausar';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-play"></i> Animar';
    }
}

// ====== SISTEMA DE ABAS ======
function switchTab(name, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    
    if (name === 'visualization') {
        onWindowResize();
    }
}

// ====== TEMA ======
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const icon = document.getElementById('themeIcon');
    if (document.body.classList.contains('light-theme')) {
        icon.className = 'fa-solid fa-moon';
    } else {
        icon.className = 'fa-solid fa-sun';
    }
});

// ====== VOLTAR ======
document.getElementById('toGoBackBtn').addEventListener('click', function() {
    window.location.href = "../../index.html";
});