// ====== DADOS DA TABELA PERIÓDICA ======
const periodicTable = [
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

// ====== MÓDULO DO SIMULADOR DE REAÇÕES ======
const ReactionSimulator = (function() {
    // Dados dos Reagentes
    const reagents = {
        acidos: [
            { 
                name: "Ácido Clorídrico", 
                formula: "HCl", 
                type: "acid",
                elements: { 'H': 1, 'Cl': 1 }
            },
            { 
                name: "Ácido Sulfúrico", 
                formula: "H₂SO₄", 
                type: "acid",
                elements: { 'H': 2, 'S': 1, 'O': 4 }
            },
            { 
                name: "Ácido Nítrico", 
                formula: "HNO₃", 
                type: "acid",
                elements: { 'H': 1, 'N': 1, 'O': 3 }
            },
            { 
                name: "Ácido Acético", 
                formula: "CH₃COOH", 
                type: "acid",
                elements: { 'C': 2, 'H': 4, 'O': 2 }
            }
        ],
        bases: [
            { 
                name: "Hidróxido de Sódio", 
                formula: "NaOH", 
                type: "base",
                elements: { 'Na': 1, 'O': 1, 'H': 1 }
            },
            { 
                name: "Hidróxido de Potássio", 
                formula: "KOH", 
                type: "base",
                elements: { 'K': 1, 'O': 1, 'H': 1 }
            },
            { 
                name: "Hidróxido de Cálcio", 
                formula: "Ca(OH)₂", 
                type: "base",
                elements: { 'Ca': 1, 'O': 2, 'H': 2 }
            },
            { 
                name: "Amoníaco", 
                formula: "NH₃", 
                type: "base",
                elements: { 'N': 1, 'H': 3 }
            }
        ],
        sais: [
            { 
                name: "Cloreto de Sódio", 
                formula: "NaCl", 
                type: "salt",
                elements: { 'Na': 1, 'Cl': 1 }
            },
            { 
                name: "Carbonato de Cálcio", 
                formula: "CaCO₃", 
                type: "salt",
                elements: { 'Ca': 1, 'C': 1, 'O': 3 }
            },
            { 
                name: "Sulfato de Cobre", 
                formula: "CuSO₄", 
                type: "salt",
                elements: { 'Cu': 1, 'S': 1, 'O': 4 }
            },
            { 
                name: "Nitrato de Prata", 
                formula: "AgNO₃", 
                type: "salt",
                elements: { 'Ag': 1, 'N': 1, 'O': 3 }
            }
        ],
        metais: [
            { 
                name: "Zinco", 
                formula: "Zn", 
                type: "metal",
                elements: { 'Zn': 1 }
            },
            { 
                name: "Ferro", 
                formula: "Fe", 
                type: "metal",
                elements: { 'Fe': 1 }
            },
            { 
                name: "Alumínio", 
                formula: "Al", 
                type: "metal",
                elements: { 'Al': 1 }
            },
            { 
                name: "Cobre", 
                formula: "Cu", 
                type: "metal",
                elements: { 'Cu': 1 }
            },
            { 
                name: "Magnésio", 
                formula: "Mg", 
                type: "metal",
                elements: { 'Mg': 1 }
            }
        ],
        oxidantes: [
            { 
                name: "Oxigênio", 
                formula: "O₂", 
                type: "oxidant",
                elements: { 'O': 2 }
            },
            { 
                name: "Peróxido de Hidrogênio", 
                formula: "H₂O₂", 
                type: "oxidant",
                elements: { 'H': 2, 'O': 2 }
            },
            { 
                name: "Permanganato de Potássio", 
                formula: "KMnO₄", 
                type: "oxidant",
                elements: { 'K': 1, 'Mn': 1, 'O': 4 }
            }
        ]
    };

    // Banco de dados de reações conhecidas
    const knownReactions = {
        'HCl+NaOH': {
            reactants: ['HCl', 'NaOH'],
            products: ['NaCl', 'H₂O'],
            coefficients: [1, 1, 1, 1],
            type: 'neutralization',
            description: 'Neutralização: Ácido + Base → Sal + Água'
        },
        'H₂SO₄+NaOH': {
            reactants: ['H₂SO₄', 'NaOH'],
            products: ['Na₂SO₄', 'H₂O'],
            coefficients: [1, 2, 1, 2],
            type: 'neutralization',
            description: 'Neutralização com ácido diprótico'
        },
        'Zn+HCl': {
            reactants: ['Zn', 'HCl'],
            products: ['ZnCl₂', 'H₂'],
            coefficients: [1, 2, 1, 1],
            type: 'metal-acid',
            description: 'Metal + Ácido → Sal + Hidrogênio'
        },
        'CaCO₃+HCl': {
            reactants: ['CaCO₃', 'HCl'],
            products: ['CaCl₂', 'H₂O', 'CO₂'],
            coefficients: [1, 2, 1, 1, 1],
            type: 'carbonate-acid',
            description: 'Carbonato + Ácido → Sal + Água + CO₂'
        },
        'CH₃COOH+NaOH': {
            reactants: ['CH₃COOH', 'NaOH'],
            products: ['CH₃COONa', 'H₂O'],
            coefficients: [1, 1, 1, 1],
            type: 'neutralization',
            description: 'Neutralização de ácido orgânico'
        },
        'Mg+HCl': {
            reactants: ['Mg', 'HCl'],
            products: ['MgCl₂', 'H₂'],
            coefficients: [1, 2, 1, 1],
            type: 'metal-acid',
            description: 'Metal + Ácido → Sal + Hidrogênio'
        },
        'AgNO₃+NaCl': {
            reactants: ['AgNO₃', 'NaCl'],
            products: ['AgCl', 'NaNO₃'],
            coefficients: [1, 1, 1, 1],
            type: 'precipitation',
            description: 'Precipitação: formação de cloreto de prata'
        }
    };

    let selectedReagents = { reactant1: null, reactant2: null };
    let reactionScene, reactionCamera, reactionRenderer, reactionControls;

    // Inicializar o simulador de reações
    function init() {
        initializeReagentDropdowns();
        setupEventListeners();
        initReactionCanvas();
    }

    function initReactionCanvas() {
        const container = document.getElementById('reactionCanvas');
        if (!container) {
            console.log('Canvas container não encontrado');
            return;
        }
        
        // Limpar canvas existente
        container.width = container.clientWidth;
        container.height = container.clientHeight;
        
        // Criar cena
        reactionScene = new THREE.Scene();
        reactionScene.background = new THREE.Color(0x0a0a0a);
        
        // Configurar câmera
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        console.log('Canvas dimensions:', width, height);
        
        reactionCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        reactionCamera.position.set(0, 0, 15);
        
        // Configurar renderizador
        reactionRenderer = new THREE.WebGLRenderer({ 
            canvas: container,
            antialias: true,
            alpha: false // Mudar para false para fundo sólido
        });
        reactionRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar pixel ratio
        reactionRenderer.setSize(width, height, false);
        reactionRenderer.setClearColor(0x0a0a0a, 1); // Fundo preto sólido
        
        // Configurar controles de órbita
        reactionControls = new THREE.OrbitControls(reactionCamera, reactionRenderer.domElement);
        reactionControls.enableDamping = true;
        reactionControls.dampingFactor = 0.05;
        reactionControls.enableZoom = true;
        reactionControls.enablePan = false;
        reactionControls.minDistance = 5;
        reactionControls.maxDistance = 50;
        
        // Adicionar luzes
        const ambient = new THREE.AmbientLight(0x404040, 0.8);
        reactionScene.add(ambient);
        
        const directional1 = new THREE.DirectionalLight(0xffffff, 0.6);
        directional1.position.set(5, 5, 5);
        reactionScene.add(directional1);
        
        const directional2 = new THREE.DirectionalLight(0xffffff, 0.4);
        directional2.position.set(-5, -5, 5);
        reactionScene.add(directional2);
        
        // Adicionar grade de referência
        const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
        gridHelper.position.y = -2;
        reactionScene.add(gridHelper);
        
        // Adicionar eixos
        const axesHelper = new THREE.AxesHelper(5);
        reactionScene.add(axesHelper);
        
        // Texto inicial
        createInitialScene();
        
        // Animação
        animateReactionScene();
        
        // Redimensionamento
        window.addEventListener('resize', onReactionResize);
        
        console.log('Canvas de reações inicializado');
    }

    function createInitialScene() {
        // Limpar cena (mantendo luzes e helpers)
        const objectsToRemove = [];
        reactionScene.children.forEach(child => {
            if (!child.isLight && !child.isAxesHelper && !child.isGridHelper) {
                objectsToRemove.push(child);
            }
        });
        
        objectsToRemove.forEach(object => reactionScene.remove(object));
        
        // Criar mensagem visual inicial
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x10b981,
            transparent: true,
            opacity: 0.7
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 0);
        reactionScene.add(cube);
        
        // Adicionar texto flutuante
        const textGeometry = new THREE.SphereGeometry(0.5, 8, 6);
        const textMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x3b82f6,
            emissive: 0x1e3a8a
        });
        
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 4;
            const sphere = new THREE.Mesh(textGeometry, textMaterial);
            sphere.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * 2,
                Math.sin(angle) * radius
            );
            reactionScene.add(sphere);
        }
    }

    function animateReactionScene() {
        requestAnimationFrame(animateReactionScene);
        
        if (reactionControls) {
            reactionControls.update();
        }
        
        // Animar rotação da cena
        reactionScene.children.forEach(child => {
            if (child.isMesh && child.geometry.type === 'BoxGeometry') {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            }
        });
        
        if (reactionRenderer && reactionScene && reactionCamera) {
            reactionRenderer.render(reactionScene, reactionCamera);
        }
    }

    function onReactionResize() {
        if (!reactionRenderer || !reactionCamera) return;
        
        const container = document.getElementById('reactionCanvas');
        if (!container || !container.parentElement) return;
        
        const width = container.parentElement.clientWidth;
        const height = container.parentElement.clientHeight;
        
        console.log('Resizing canvas to:', width, height);
        
        reactionCamera.aspect = width / height;
        reactionCamera.updateProjectionMatrix();
        reactionRenderer.setSize(width, height, false);
        
        // Forçar re-render
        reactionRenderer.render(reactionScene, reactionCamera);
    }

    function visualizeReaction(reaction) {
        if (!reactionScene) return;
        
        console.log('Visualizando reação:', reaction);
        
        // Limpar cena (mantendo luzes e helpers)
        const objectsToRemove = [];
        reactionScene.children.forEach(child => {
            if (!child.isLight && !child.isAxesHelper && !child.isGridHelper) {
                objectsToRemove.push(child);
            }
        });
        
        objectsToRemove.forEach(object => reactionScene.remove(object));
        
        const reactants = reaction.reactants;
        const products = reaction.products;
        
        // Criar esferas para representar os reagentes
        reactants.forEach((reactant, index) => {
            const geometry = new THREE.SphereGeometry(1.0, 16, 16);
            const material = new THREE.MeshPhongMaterial({ 
                color: getReactionColor(reactant),
                emissive: getReactionEmissive(reactant),
                shininess: 100
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            // Posicionar reagentes à esquerda em formação circular
            const angle = (index / reactants.length) * Math.PI * 2;
            const radius = 3;
            sphere.position.set(
                Math.cos(angle) * radius - 5,
                Math.sin(angle) * 2,
                0
            );
            
            reactionScene.add(sphere);
            
            // Adicionar animação flutuante
            sphere.userData = {
                originalY: sphere.position.y,
                time: Math.random() * Math.PI * 2
            };
        });
        
        // Criar esferas para representar os produtos
        products.forEach((product, index) => {
            const geometry = new THREE.SphereGeometry(1.0, 16, 16);
            const material = new THREE.MeshPhongMaterial({ 
                color: getReactionColor(product),
                emissive: getReactionEmissive(product),
                shininess: 100
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            // Posicionar produtos à direita em formação circular
            const angle = (index / products.length) * Math.PI * 2;
            const radius = 3;
            sphere.position.set(
                Math.cos(angle) * radius + 5,
                Math.sin(angle) * 2,
                0
            );
            
            reactionScene.add(sphere);
            
            // Adicionar animação flutuante
            sphere.userData = {
                originalY: sphere.position.y,
                time: Math.random() * Math.PI * 2
            };
        });
        
        // Adicionar setas animadas entre reagentes e produtos
        createAnimatedArrows();
    }

    function createAnimatedArrows() {
        // Criar setas apontando da esquerda para direita
        for (let i = 0; i < 3; i++) {
            const arrowGeometry = new THREE.ConeGeometry(0.2, 0.8, 8);
            const arrowMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x10b981,
                emissive: 0x064e3b
            });
            const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
            
            arrow.rotation.z = Math.PI / 2;
            arrow.position.set(i * 2 - 2, 0, 0);
            
            // Animação de pulsação
            arrow.userData = {
                scale: 1,
                growing: true
            };
            
            reactionScene.add(arrow);
        }
    }

    function getReactionColor(formula) {
        const colors = {
            'HCl': 0xff4444, 'H₂SO₄': 0xff4444, 'HNO₃': 0xff4444, 'CH₃COOH': 0xff4444,
            'NaOH': 0x4444ff, 'KOH': 0x4444ff, 'Ca(OH)₂': 0x4444ff, 'NH₃': 0x4444ff,
            'NaCl': 0x44ff44, 'CaCO₃': 0x44ff44, 'CuSO₄': 0x44ff44, 'AgNO₃': 0x44ff44,
            'Zn': 0xffaa44, 'Fe': 0xffaa44, 'Al': 0xffaa44, 'Cu': 0xffaa44, 'Mg': 0xffaa44,
            'Na₂SO₄': 0x44ff44, 'ZnCl₂': 0x44ff44, 'CaCl₂': 0x44ff44, 'MgCl₂': 0x44ff44,
            'H₂O': 0x44aaff, 'CO₂': 0xaaaaaa, 'H₂': 0xffffff, 'AgCl': 0x44ff44,
            'CH₃COONa': 0x44ff44, 'NaNO₃': 0x44ff44,
            'O₂': 0xff6666, 'H₂O₂': 0xff8888, 'KMnO₄': 0xff44ff
        };
        return colors[formula] || 0x888888;
    }

    function getReactionEmissive(formula) {
        const emissive = {
            'HCl': 0x442222, 'H₂SO₄': 0x442222, 'HNO₃': 0x442222,
            'NaOH': 0x222244, 'KOH': 0x222244,
            'NaCl': 0x224422, 'H₂O': 0x222244,
            'H₂': 0x444444, 'CO₂': 0x333333
        };
        return emissive[formula] || 0x222222;
    }

    // ... (restante das funções do simulador permanecem iguais) ...

    // Inicializar quando a aba de reações for aberta
    function onReactionsTabOpen() {
        // Pequeno delay para garantir que o DOM esteja pronto
        setTimeout(() => {
            if (!reactionRenderer) {
                initReactionCanvas();
            } else {
                onReactionResize(); // Forçar redimensionamento
            }
        }, 100);
    }

    // Retornar a API pública do módulo
    return {
        init,
        toggleDropdown,
        selectReagent,
        balanceEquation,
        simulateReaction,
        loadExample,
        onReactionsTabOpen // Nova função para inicialização sob demanda
    };
})();

// Variáveis globais
let currentElement = periodicTable[0];
let scene, camera, renderer, controls;
let animationId = null;
let isAnimating = true;
let viewMode = 'orbital';

// Variáveis para o modo núcleo
let protonMeshes = [];
let neutronMeshes = [];
let cloudShellGroups = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializePeriodicTable();
    initSearch();
    init3DViewer();
    updateElementInfo();
    updateAtomInfo();
    ReactionSimulator.init(); // Inicializar o simulador de reações
});

// ====== INICIALIZAR TABELA PERIÓDICA ======
function initializePeriodicTable() {
    const table = document.getElementById('periodicTable');
    table.innerHTML = '';
    
    periodicTable.forEach((element, index) => {
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
        const elements = document.querySelectorAll('.element-item');
        
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
        
        // Animar núcleo realista se estiver no modo núcleo
        if (viewMode === 'nucleus' && isAnimating) {
            animateRealisticNucleus();
        }
        
        // Animar nuvem se estiver no modo nuvem
        if (viewMode === 'cloud' && isAnimating) {
            animateCloud();
        }
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
    if (!scene) return;
    
    // Limpar cena
    clearScene();
    
    // Criar átomo baseado no modo de visualização
    const atomGroup = createAtomGroup(currentElement);
    scene.add(atomGroup);
}

function clearScene() {
    scene.children.slice().forEach(child => {
        if (child.type !== 'AmbientLight' && child.type !== 'PointLight') {
            scene.remove(child);
        }
    });
    
    // Limpar arrays
    protonMeshes = [];
    neutronMeshes = [];
    cloudShellGroups = [];
}

function createAtomGroup(element) {
    const group = new THREE.Group();
    group.userData.isAtomGroup = true;
    
    if (viewMode === 'orbital') {
        createOrbitalView(group, element);
    } else if (viewMode === 'cloud') {
        createCloudView(group, element);
    } else if (viewMode === 'nucleus') {
        createRealisticNucleus(group, element);
    }
    
    return group;
}

// ====== MODO ORBITAL (ORIGINAL) ======
function createOrbitalView(group, element) {
    // Núcleo
    const nucleusGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ 
        color: getAtomColor(element.symbol),
        emissive: getAtomEmissive(element.symbol),
        shininess: 100
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleus);
    
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

// ====== MODO NUVEM ULTRARREALISTA ======
function createCloudView(group, element) {
    // Núcleo central
    const nucleusGeometry = new THREE.SphereGeometry(1.0, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ 
        color: getAtomColor(element.symbol),
        emissive: getAtomEmissive(element.symbol),
        shininess: 100
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    group.add(nucleus);
    
    const shells = calculateElectronShells(element.electrons);
    const baseRadius = 4.0;

    shells.forEach((shell, idx) => {
        const radius = baseRadius + idx * 1.5;
        const particles = shell * 80; // Partículas proporcionais aos elétrons

        const positions = new Float32Array(particles * 3);

        for (let i = 0; i < particles; i++) {
            // Distribuição radial probabilística (esfera fuzzy)
            const r = radius + (Math.random() - 0.5) * 2.0;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const index = i * 3;
            positions[index] = x;
            positions[index + 1] = y;
            positions[index + 2] = z;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0x10b981,
            size: 0.12,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const cloud = new THREE.Points(geometry, material);
        cloud.userData = { radius, shellIndex: idx, positions: positions };
        cloudShellGroups.push(cloud);
        group.add(cloud);
    });
}

function animateCloud() {
    const t = performance.now() * 0.0008;

    cloudShellGroups.forEach((cloud, idx) => {
        const positions = cloud.geometry.attributes.position;

        for (let i = 0; i < positions.count; i++) {
            const ix = i * 3;
            const iy = ix + 1;
            const iz = ix + 2;

            // Leve oscilação (efeito quântico)
            positions.array[ix] += Math.sin(t + i * 0.01) * 0.003;
            positions.array[iy] += Math.cos(t + i * 0.013) * 0.003;
            positions.array[iz] += Math.sin(t + i * 0.017) * 0.003;
        }

        positions.needsUpdate = true;
    });
}

// ====== MODO NÚCLEO ULTRARREALISTA ======
function createRealisticNucleus(group, element) {
    const protons = element.protons;
    const neutrons = element.neutrons;
    const totalNucleons = protons + neutrons;
    
    // Raio nuclear baseado na fórmula R = R₀ * A^(1/3), onde R₀ ≈ 1.2 fm
    const nuclearConstant = 1.2;
    const nucleusRadius = nuclearConstant * Math.pow(totalNucleons, 1/3);
    
    // Escala para visualização
    const visualScale = 1.2;
    const scaledRadius = nucleusRadius * visualScale;

    // Posicionar nucleons usando algoritmo de empacotamento esférico
    const positions = calculateNuclearPacking(protons, neutrons, scaledRadius);

    // Criar prótons
    for (let i = 0; i < protons; i++) {
        const proton = createNucleon('proton', getAtomColor(element.symbol));
        proton.position.copy(positions[i]);
        protonMeshes.push(proton);
        group.add(proton);
    }

    // Criar nêutrons
    for (let i = 0; i < neutrons; i++) {
        const neutron = createNucleon('neutron', 0x888888);
        neutron.position.copy(positions[protons + i]);
        neutronMeshes.push(neutron);
        group.add(neutron);
    }

    // Adicionar forças de interação para movimento realista
    setupNuclearForces(protonMeshes, neutronMeshes, 2.0, 0.5);
}

function createNucleon(type, color) {
    // Tamanhos relativos baseados em dados reais
    const protonRadius = 0.4;
    const neutronRadius = 0.45;
    
    const radius = type === 'proton' ? protonRadius : neutronRadius;
    
    const geometry = new THREE.SphereGeometry(radius, 16, 16);
    
    let material;
    if (type === 'proton') {
        material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: new THREE.Color(color).multiplyScalar(0.3),
            shininess: 90,
            specular: 0x444444
        });
    } else {
        material = new THREE.MeshPhongMaterial({
            color: 0x888888,
            emissive: 0x222222,
            shininess: 80,
            specular: 0x333333
        });
    }

    const nucleon = new THREE.Mesh(geometry, material);
    
    // Adicionar "glow" sutil
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 12, 12);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: type === 'proton' ? color : 0x666666,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    nucleon.add(glow);

    // Propriedades físicas
    nucleon.userData = {
        type: type,
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
        ),
        mass: type === 'proton' ? 1.0 : 1.001,
        charge: type === 'proton' ? 1 : 0
    };

    return nucleon;
}

function calculateNuclearPacking(protons, neutrons, maxRadius) {
    const totalParticles = protons + neutrons;
    const positions = [];
    
    // Algoritmo de empacotamento esférico melhorado
    const maxAttempts = 1000;
    const minDistance = 0.8;
    
    for (let i = 0; i < totalParticles; i++) {
        let position;
        let attempts = 0;
        let validPosition = false;
        
        while (!validPosition && attempts < maxAttempts) {
            // Distribuição mais densa no centro (modelo de densidade nuclear)
            const r = maxRadius * Math.pow(Math.random(), 1/3);
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            
            position = new THREE.Vector3(
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(theta)
            );
            
            // Verificar colisões
            validPosition = true;
            for (let j = 0; j < positions.length; j++) {
                if (position.distanceTo(positions[j]) < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        if (!validPosition) {
            // Fallback: posição aleatória na superfície
            const r = maxRadius * 0.9;
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            position = new THREE.Vector3(
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(theta)
            );
        }
        
        positions.push(position);
    }
    
    return positions;
}

function setupNuclearForces(protons, neutrons, strongForceDistance, repulsionForce) {
    const allNucleons = [...protons, ...neutrons];
    
    allNucleons.forEach(nucleon => {
        nucleon.userData.applyForces = function() {
            const force = new THREE.Vector3();
            
            // Interação com outros nucleons
            allNucleons.forEach(other => {
                if (nucleon === other) return;
                
                const distance = nucleon.position.distanceTo(other.position);
                const direction = new THREE.Vector3()
                    .subVectors(other.position, nucleon.position)
                    .normalize();
                
                // Força nuclear forte (atrativa em curta distância)
                if (distance < strongForceDistance * 1.5) {
                    const strongForce = (distance - strongForceDistance) * 0.008;
                    force.add(direction.multiplyScalar(strongForce));
                }
                
                // Repulsão coulombiana entre prótons
                if (nucleon.userData.charge > 0 && other.userData.charge > 0) {
                    const coulombForce = repulsionForce / (distance * distance);
                    force.add(direction.multiplyScalar(-coulombForce));
                }
                
                // Repulsão de contato (evitar sobreposição)
                if (distance < 0.7) {
                    const contactForce = 0.05 / (distance * distance);
                    force.add(direction.multiplyScalar(-contactForce));
                }
            });
            
            // Força de confinamento (mantém no núcleo)
            const centerDistance = nucleon.position.length();
            if (centerDistance > 3) {
                const confinementForce = -0.003 * centerDistance;
                force.add(nucleon.position.clone().normalize().multiplyScalar(confinementForce));
            }
            
            return force;
        };
    });
}

function animateRealisticNucleus() {
    const allNucleons = [...protonMeshes, ...neutronMeshes];
    const damping = 0.95;
    
    // Aplicar forças e atualizar posições
    allNucleons.forEach(nucleon => {
        const force = nucleon.userData.applyForces();
        
        // Integração de velocidade (Euler simples)
        nucleon.userData.velocity.add(force);
        nucleon.userData.velocity.multiplyScalar(damping);
        
        // Atualizar posição
        nucleon.position.add(nucleon.userData.velocity);
        
        // Pequena rotação para efeito visual
        nucleon.rotation.x += 0.01;
        nucleon.rotation.y += 0.015;
    });
}

// ====== FUNÇÕES AUXILIARES ======
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
        // Grupo 1 - Metais Alcalinos (vermelho)
        'H': 0xffffff, 'Li': 0xff6b6b, 'Na': 0xff6b6b, 'K': 0xff6b6b, 
        'Rb': 0xff6b6b, 'Cs': 0xff6b6b, 'Fr': 0xff6b6b,
        
        // Grupo 2 - Metais Alcalino-Terrosos (verde água)
        'Be': 0x4ecdc4, 'Mg': 0x4ecdc4, 'Ca': 0x4ecdc4, 'Sr': 0x4ecdc4,
        'Ba': 0x4ecdc4, 'Ra': 0x4ecdc4,
        
        // Grupos 3-12 - Metais de Transição (laranja/amarelo)
        'Sc': 0xffa500, 'Ti': 0xffa500, 'V': 0xffa500, 'Cr': 0xffa500,
        'Mn': 0xffa500, 'Fe': 0xff8c00, 'Co': 0xffa500, 'Ni': 0xffa500,
        'Cu': 0xb87333, 'Zn': 0xffa500, 'Y': 0xffa500, 'Zr': 0xffa500,
        'Nb': 0xffa500, 'Mo': 0xffa500, 'Tc': 0xffa500, 'Ru': 0xffa500,
        'Rh': 0xffa500, 'Pd': 0xffa500, 'Ag': 0xc0c0c0, 'Cd': 0xffa500,
        'Hf': 0xffa500, 'Ta': 0xffa500, 'W': 0xffa500, 'Re': 0xffa500,
        'Os': 0xffa500, 'Ir': 0xffa500, 'Pt': 0xffa500, 'Au': 0xffd700,
        'Hg': 0xffa500, 'Rf': 0xffa500, 'Db': 0xffa500, 'Sg': 0xffa500,
        'Bh': 0xffa500, 'Hs': 0xffa500, 'Mt': 0xffa500, 'Ds': 0xffa500,
        'Rg': 0xffa500, 'Cn': 0xffa500,
        
        // Grupo 13 - Boro (rosa)
        'B': 0xff9f40, 'Al': 0xc0c0c0, 'Ga': 0xff69b4, 'In': 0xff69b4,
        'Tl': 0xff69b4, 'Nh': 0xff69b4,
        
        // Grupo 14 - Carbono (cinza escuro)
        'C': 0x333333, 'Si': 0x808080, 'Ge': 0x808080, 'Sn': 0x808080,
        'Pb': 0x808080, 'Fl': 0x808080,
        
        // Grupo 15 - Nitrogênio (azul)
        'N': 0x0066ff, 'P': 0xffa500, 'As': 0x808080, 'Sb': 0x808080,
        'Bi': 0x808080, 'Mc': 0x808080,
        
        // Grupo 16 - Oxigênio (vermelho)
        'O': 0xff0000, 'S': 0xffff00, 'Se': 0xffff00, 'Te': 0x808080,
        'Po': 0x808080, 'Lv': 0x808080,
        
        // Grupo 17 - Halogênios (verde)
        'F': 0x90ee90, 'Cl': 0x00ff00, 'Br': 0x00ff00, 'I': 0x00ff00,
        'At': 0x00ff00, 'Ts': 0x00ff00,
        
        // Grupo 18 - Gases Nobres (rosa/roxo)
        'He': 0xffd700, 'Ne': 0xff69b4, 'Ar': 0x87ceeb, 'Kr': 0xff69b4,
        'Xe': 0xff69b4, 'Rn': 0xff69b4, 'Og': 0xff69b4,
        
        // Lantanídeos (verde claro)
        'La': 0x98fb98, 'Ce': 0x98fb98, 'Pr': 0x98fb98, 'Nd': 0x98fb98,
        'Pm': 0x98fb98, 'Sm': 0x98fb98, 'Eu': 0x98fb98, 'Gd': 0x98fb98,
        'Tb': 0x98fb98, 'Dy': 0x98fb98, 'Ho': 0x98fb98, 'Er': 0x98fb98,
        'Tm': 0x98fb98, 'Yb': 0x98fb98, 'Lu': 0x98fb98,
        
        // Actinídeos (rosa claro)
        'Ac': 0xffb6c1, 'Th': 0xffb6c1, 'Pa': 0xffb6c1, 'U': 0xffb6c1,
        'Np': 0xffb6c1, 'Pu': 0xffb6c1, 'Am': 0xffb6c1, 'Cm': 0xffb6c1,
        'Bk': 0xffb6c1, 'Cf': 0xffb6c1, 'Es': 0xffb6c1, 'Fm': 0xffb6c1,
        'Md': 0xffb6c1, 'No': 0xffb6c1, 'Lr': 0xffb6c1
    };
    return colors[symbol] || 0x888888;
}

function getAtomEmissive(symbol) {
    const emissive = {
        // Grupo 1 - Metais Alcalinos
        'H': 0x222222, 'Li': 0x442222, 'Na': 0x442222, 'K': 0x442222,
        'Rb': 0x442222, 'Cs': 0x442222, 'Fr': 0x442222,
        
        // Grupo 2 - Metais Alcalino-Terrosos
        'Be': 0x224444, 'Mg': 0x224444, 'Ca': 0x224444, 'Sr': 0x224444,
        'Ba': 0x224444, 'Ra': 0x224444,
        
        // Grupos 3-12 - Metais de Transição
        'Sc': 0x444422, 'Ti': 0x444422, 'V': 0x444422, 'Cr': 0x444422,
        'Mn': 0x444422, 'Fe': 0x444422, 'Co': 0x444422, 'Ni': 0x444422,
        'Cu': 0x444422, 'Zn': 0x444422, 'Y': 0x444422, 'Zr': 0x444422,
        'Nb': 0x444422, 'Mo': 0x444422, 'Tc': 0x444422, 'Ru': 0x444422,
        'Rh': 0x444422, 'Pd': 0x444422, 'Ag': 0x444444, 'Cd': 0x444422,
        'Hf': 0x444422, 'Ta': 0x444422, 'W': 0x444422, 'Re': 0x444422,
        'Os': 0x444422, 'Ir': 0x444422, 'Pt': 0x444422, 'Au': 0x444400,
        'Hg': 0x444422, 'Rf': 0x444422, 'Db': 0x444422, 'Sg': 0x444422,
        'Bh': 0x444422, 'Hs': 0x444422, 'Mt': 0x444422, 'Ds': 0x444422,
        'Rg': 0x444422, 'Cn': 0x444422,
        
        // Grupo 13
        'B': 0x444422, 'Al': 0x444444, 'Ga': 0x442244, 'In': 0x442244,
        'Tl': 0x442244, 'Nh': 0x442244,
        
        // Grupo 14
        'C': 0x111111, 'Si': 0x222222, 'Ge': 0x222222, 'Sn': 0x222222,
        'Pb': 0x222222, 'Fl': 0x222222,
        
        // Grupo 15
        'N': 0x000044, 'P': 0x444422, 'As': 0x222222, 'Sb': 0x222222,
        'Bi': 0x222222, 'Mc': 0x222222,
        
        // Grupo 16
        'O': 0x440000, 'S': 0x444400, 'Se': 0x444400, 'Te': 0x222222,
        'Po': 0x222222, 'Lv': 0x222222,
        
        // Grupo 17
        'F': 0x224422, 'Cl': 0x004400, 'Br': 0x004400, 'I': 0x004400,
        'At': 0x004400, 'Ts': 0x004400,
        
        // Grupo 18
        'He': 0x444400, 'Ne': 0x442244, 'Ar': 0x224444, 'Kr': 0x442244,
        'Xe': 0x442244, 'Rn': 0x442244, 'Og': 0x442244,
        
        // Lantanídeos
        'La': 0x224422, 'Ce': 0x224422, 'Pr': 0x224422, 'Nd': 0x224422,
        'Pm': 0x224422, 'Sm': 0x224422, 'Eu': 0x224422, 'Gd': 0x224422,
        'Tb': 0x224422, 'Dy': 0x224422, 'Ho': 0x224422, 'Er': 0x224422,
        'Tm': 0x224422, 'Yb': 0x224422, 'Lu': 0x224422,
        
        // Actinídeos
        'Ac': 0x442233, 'Th': 0x442233, 'Pa': 0x442233, 'U': 0x442233,
        'Np': 0x442233, 'Pu': 0x442233, 'Am': 0x442233, 'Cm': 0x442233,
        'Bk': 0x442233, 'Cf': 0x442233, 'Es': 0x442233, 'Fm': 0x442233,
        'Md': 0x442233, 'No': 0x442233, 'Lr': 0x442233
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
    } else if (name === 'reactions') {
        // Inicializar o canvas de reações quando a aba for aberta
        ReactionSimulator.onReactionsTabOpen();
    }

// ====== SISTEMA DE ABAS DO CENTRO ======
function switchCenterTab(name, btn) {
    document.querySelectorAll('.center-panel .tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    document.querySelectorAll('.center-panel .tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
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
