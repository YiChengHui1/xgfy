const countryList = {
  'Afghanistan': '阿富汗',
  'Singapore': '新加坡',
  'Angola': '安哥拉',
  'Albania': '阿尔巴尼亚',
  'United Arab Emirates': '阿联酋',
  'Argentina': '阿根廷',
  'Armenia': '亚美尼亚',
  'French Southern and Antarctic Lands': '法属南半球和南极领地',
  'Australia': '澳大利亚',
  'Austria': '奥地利',
  'Azerbaijan': '阿塞拜疆',
  'Burundi': '布隆迪',
  'Belgium': '比利时',
  'Benin': '贝宁',
  'Burkina Faso': '布基纳法索',
  'Bangladesh': '孟加拉国',
  'Bulgaria': '保加利亚',
  'The Bahamas': '巴哈马',
  'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
  'Belarus': '白俄罗斯',
  'Belize': '伯利兹',
  'Bermuda': '百慕大',
  'Bolivia': '玻利维亚',
  'Brazil': '巴西',
  'Brunei': '文莱',
  'Bhutan': '不丹',
  'Botswana': '博茨瓦纳',
  'Central African Rep.': '中非',
  'Canada': '加拿大',
  'Switzerland': '瑞士',
  'Chile': '智利',
  'China': '中国',
  'Ivory Coast': '象牙海岸',
  'Cameroon': '喀麦隆',
  'Democratic Republic of the Congo': '刚果民主共和国',
  'Republic of the Congo': '刚果共和国',
  'Colombia': '哥伦比亚',
  'Costa Rica': '哥斯达黎加',
  'Cuba': '古巴',
  'Northern Cyprus': '北塞浦路斯',
  'Cyprus': '塞浦路斯',
  'Czech Rep.': '捷克',
  'Germany': '德国',
  'Djibouti': '吉布提',
  'Denmark': '丹麦',
  'Dominican Rep.': '多米尼加共和国',
  'Algeria': '阿尔及利亚',
  'Ecuador': '厄瓜多尔',
  'Egypt': '埃及',
  'Eritrea': '厄立特里亚',
  'Spain': '西班牙',
  'Estonia': '爱沙尼亚',
  'Ethiopia': '埃塞俄比亚',
  'Finland': '芬兰',
  'Fiji': '斐济',
  'Falkland Islands': '福克兰群岛',
  'France': '法国',
  'Gabon': '加蓬',
  'United Kingdom': '英国',
  'Georgia': '格鲁吉亚',
  'Ghana': '加纳',
  'Guinea': '几内亚',
  'Gambia': '冈比亚',
  'Guinea Bissau': '几内亚比绍',
  'Eq. Guinea': '赤道几内亚',
  'Greece': '希腊',
  'Greenland': '格陵兰岛',
  'Guatemala': '危地马拉',
  'French Guiana': '法属圭亚那',
  'Guyana': '圭亚那',
  'Honduras': '洪都拉斯',
  'Croatia': '克罗地亚',
  'Haiti': '海地',
  'Hungary': '匈牙利',
  'Indonesia': '印度尼西亚',
  'India': '印度',
  'Ireland': '爱尔兰',
  'Iran': '伊朗',
  'Iraq': '伊拉克',
  'Iceland': '冰岛',
  'Israel': '以色列',
  'Italy': '意大利',
  'Jamaica': '牙买加',
  'Jordan': '约旦',
  'Japan': '日本',
  'Kazakhstan': '哈萨克斯坦',
  'Kenya': '肯尼亚',
  'Kyrgyzstan': '吉尔吉斯斯坦',
  'Cambodia': '柬埔寨',
  'Dem. Rep. Korea': '韩国',
  'Kosovo': '科索沃',
  'Kuwait': '科威特',
  'Lao PDR': '老挝',
  'Lebanon': '黎巴嫩',
  'Liberia': '利比里亚',
  'Libya': '利比亚',
  'Sri Lanka': '斯里兰卡',
  'Lesotho': '莱索托',
  'Lithuania': '立陶宛',
  'Luxembourg': '卢森堡',
  'Latvia': '拉脱维亚',
  'Morocco': '摩洛哥',
  'Moldova': '摩尔多瓦',
  'Madagascar': '马达加斯加',
  'Mexico': '墨西哥',
  'Macedonia': '北马其顿',
  'Mali': '马里',
  'Myanmar': '缅甸',
  'Montenegro': '黑山',
  'Mongolia': '蒙古',
  'Mozambique': '莫桑比克',
  'Mauritania': '毛里塔尼亚',
  'Malawi': '马拉维',
  'Malaysia': '马来西亚',
  'Namibia': '纳米比亚',
  'New Caledonia': '新喀里多尼亚',
  'Niger': '尼日尔',
  'Nigeria': '尼日利亚',
  'Nicaragua': '尼加拉瓜',
  'Netherlands': '荷兰',
  'Norway': '挪威',
  'Nepal': '尼泊尔',
  'New Zealand': '新西兰',
  'Oman': '阿曼',
  'Pakistan': '巴基斯坦',
  'Panama': '巴拿马',
  'Peru': '秘鲁',
  'Philippines': '菲律宾',
  'Papua New Guinea': '巴布亚新几内亚',
  'Poland': '波兰',
  'Puerto Rico': '波多黎各(美)',
  'Korea': '朝鲜',
  'Portugal': '葡萄牙',
  'Paraguay': '巴拉圭',
  'Qatar': '卡塔尔',
  'Romania': '罗马尼亚',
  'Russia': '俄罗斯',
  'Rwanda': '卢旺达',
  'W. Sahara': '西撒哈拉',
  'Saudi Arabia': '沙特阿拉伯',
  'Sudan': '苏丹',
  'S. Sudan': '南苏丹',
  'Senegal': '塞内加尔',
  'Solomon Is.': '所罗门群岛',
  'Sierra Leone': '塞拉利昂',
  'El Salvador': '萨尔瓦多',
  'Somaliland': '索马里兰',
  'Somalia': '索马里',
  'Serbia': '塞尔维亚',
  'Suriname': '苏里南',
  'Slovakia': '斯洛伐克',
  'Slovenia': '斯洛文尼亚',
  'Sweden': '瑞典',
  'Swaziland': '斯威士兰',
  'Syria': '叙利亚',
  'Chad': '乍得',
  'Togo': '多哥',
  'Thailand': '泰国',
  'Tajikistan': '塔吉克斯坦',
  'Turkmenistan': '土库曼斯坦',
  'Timor-Leste': '东帝汶',
  'Trinidad and Tobago': '特里尼达和多巴哥',
  'Tunisia': '突尼斯',
  'Turkey': '土耳其',
  'Tanzania': '坦桑尼亚',
  'Uganda': '乌干达',
  'Ukraine': '乌克兰',
  'Uruguay': '乌拉圭',
  'United States': '美国',
  'Uzbekistan': '乌兹别克斯坦',
  'Venezuela': '委内瑞拉',
  'Vietnam': '越南',
  'Vanuatu': '瓦努阿图',
  'West Bank': '西岸',
  'Yemen': '也门',
  'South Africa': '南非',
  'Zambia': '赞比亚',
  'Zimbabwe': '津巴布韦',
  'Bahamas': '巴哈马',
  '南海诸岛': '南海诸岛',
  'Congo': '刚果',
  'Dem. Rep. Congo': '刚果(金)',
  'Curaçao': '库拉索',
  'Cape Verde': '佛得角',
  'Montserrat': '蒙特塞拉特岛',
  'Guam': '关岛(美)',
  'Bahrain': '巴林',
  "Principat d'Andorra": '安道尔',
  "Côte d'Ivoire": '科特迪瓦',
  "Repubblika ta' Malta": '马耳他',
  'La Réunion': '留尼汪岛',
  'Repubblica di San Marino': '圣马力诺',
  'The Republic of Mauritius': '毛里求斯',
  'Palestine': '巴勒斯坦',
  'Isle of Man': '马恩岛',
  'Mayotte': '马约特岛',
  'Guernsey': '根西岛',
  'Jersey': '泽西岛(英)',
  'N. Cyprus': '塞浦路斯',
  'Faeroe Is.': '法罗群岛(丹)',
  'U.S. Virgin Is.': '维尔京群岛(美)',
  'Guinea-Bissau': '几内亚比绍'
}
const countryList3 = {
  '阿富汗': 'Afghanistan',
  '新加坡': 'Singapore',
  '安哥拉': 'Angola',
  '阿尔巴尼亚': 'Albania',
  '阿联酋': 'United Arab Emirates',
  '阿根廷': 'Argentina',
  '亚美尼亚': 'Armenia',
  '法属南半球和南极领地': 'French Southern and Antarctic Lands',
  '澳大利亚': 'Australia',
  '奥地利': 'Austria',
  '阿塞拜疆': 'Azerbaijan',
  '布隆迪': 'Burundi',
  '比利时': 'Belgium',
  '贝宁': 'Benin',
  '布基纳法索': 'Burkina Faso',
  '孟加拉国': 'Bangladesh',
  '保加利亚': 'Bulgaria',
  '巴哈马': 'Bahamas',
  '波斯尼亚和黑塞哥维那': 'Bosnia and Herz.',
  '白俄罗斯': 'Belarus',
  '伯利兹': 'Belize',
  '百慕大': 'Bermuda',
  '玻利维亚': 'Bolivia',
  '巴西': 'Brazil',
  '文莱': 'Brunei',
  '不丹': 'Bhutan',
  '博茨瓦纳': 'Botswana',
  '中非': 'Central African Rep.',
  '加拿大': 'Canada',
  '瑞士': 'Switzerland',
  '智利': 'Chile',
  '中国': 'China',
  '象牙海岸': 'Ivory Coast',
  '喀麦隆': 'Cameroon',
  '刚果民主共和国': 'Democratic Republic of the Congo',
  '刚果共和国': 'Republic of the Congo',
  '哥伦比亚': 'Colombia',
  '哥斯达黎加': 'Costa Rica',
  '古巴': 'Cuba',
  '北塞浦路斯': 'Northern Cyprus',
  '塞浦路斯': 'N. Cyprus',
  '捷克': 'Czech Rep.',
  '德国': 'Germany',
  '吉布提': 'Djibouti',
  '丹麦': 'Denmark',
  '多米尼加共和国': 'Dominican Rep.',
  '阿尔及利亚': 'Algeria',
  '厄瓜多尔': 'Ecuador',
  '埃及': 'Egypt',
  '厄立特里亚': 'Eritrea',
  '西班牙': 'Spain',
  '爱沙尼亚': 'Estonia',
  '埃塞俄比亚': 'Ethiopia',
  '芬兰': 'Finland',
  '斐济': 'Fiji',
  '福克兰群岛': 'Falkland Islands',
  '法国': 'France',
  '加蓬': 'Gabon',
  '英国': 'United Kingdom',
  '格鲁吉亚': 'Georgia',
  '加纳': 'Ghana',
  '几内亚': 'Guinea',
  '冈比亚': 'Gambia',
  '几内亚比绍': 'Guinea-Bissau',
  '赤道几内亚': 'Eq. Guinea',
  '希腊': 'Greece',
  '格陵兰岛': 'Greenland',
  '危地马拉': 'Guatemala',
  '法属圭亚那': 'French Guiana',
  '圭亚那': 'Guyana',
  '洪都拉斯': 'Honduras',
  '克罗地亚': 'Croatia',
  '海地': 'Haiti',
  '匈牙利': 'Hungary',
  '印度尼西亚': 'Indonesia',
  '印度': 'India',
  '爱尔兰': 'Ireland',
  '伊朗': 'Iran',
  '伊拉克': 'Iraq',
  '冰岛': 'Iceland',
  '以色列': 'Israel',
  '意大利': 'Italy',
  '牙买加': 'Jamaica',
  '约旦': 'Jordan',
  '日本': 'Japan',
  '哈萨克斯坦': 'Kazakhstan',
  '肯尼亚': 'Kenya',
  '吉尔吉斯斯坦': 'Kyrgyzstan',
  '柬埔寨': 'Cambodia',
  '韩国': 'Dem. Rep. Korea',
  '科索沃': 'Kosovo',
  '科威特': 'Kuwait',
  '老挝': 'Lao PDR',
  '黎巴嫩': 'Lebanon',
  '利比里亚': 'Liberia',
  '利比亚': 'Libya',
  '斯里兰卡': 'Sri Lanka',
  '莱索托': 'Lesotho',
  '立陶宛': 'Lithuania',
  '卢森堡': 'Luxembourg',
  '拉脱维亚': 'Latvia',
  '摩洛哥': 'Morocco',
  '摩尔多瓦': 'Moldova',
  '马达加斯加': 'Madagascar',
  '墨西哥': 'Mexico',
  '北马其顿': 'Macedonia',
  '马里': 'Mali',
  '缅甸': 'Myanmar',
  '黑山': 'Montenegro',
  '蒙古': 'Mongolia',
  '莫桑比克': 'Mozambique',
  '毛里塔尼亚': 'Mauritania',
  '马拉维': 'Malawi',
  '马来西亚': 'Malaysia',
  '纳米比亚': 'Namibia',
  '新喀里多尼亚': 'New Caledonia',
  '尼日尔': 'Niger',
  '尼日利亚': 'Nigeria',
  '尼加拉瓜': 'Nicaragua',
  '荷兰': 'Netherlands',
  '挪威': 'Norway',
  '尼泊尔': 'Nepal',
  '新西兰': 'New Zealand',
  '阿曼': 'Oman',
  '巴基斯坦': 'Pakistan',
  '巴拿马': 'Panama',
  '秘鲁': 'Peru',
  '菲律宾': 'Philippines',
  '巴布亚新几内亚': 'Papua New Guinea',
  '波兰': 'Poland',
  '波多黎各(美)': 'Puerto Rico',
  '朝鲜': 'Korea',
  '葡萄牙': 'Portugal',
  '巴拉圭': 'Paraguay',
  '卡塔尔': 'Qatar',
  '罗马尼亚': 'Romania',
  '俄罗斯': 'Russia',
  '卢旺达': 'Rwanda',
  '西撒哈拉': 'W. Sahara',
  '沙特阿拉伯': 'Saudi Arabia',
  '苏丹': 'Sudan',
  '南苏丹': 'S. Sudan',
  '塞内加尔': 'Senegal',
  '所罗门群岛': 'Solomon Is.',
  '塞拉利昂': 'Sierra Leone',
  '萨尔瓦多': 'El Salvador',
  '索马里兰': 'Somaliland',
  '索马里': 'Somalia',
  '塞尔维亚': 'Serbia',
  '苏里南': 'Suriname',
  '斯洛伐克': 'Slovakia',
  '斯洛文尼亚': 'Slovenia',
  '瑞典': 'Sweden',
  '斯威士兰': 'Swaziland',
  '叙利亚': 'Syria',
  '乍得': 'Chad',
  '多哥': 'Togo',
  '泰国': 'Thailand',
  '塔吉克斯坦': 'Tajikistan',
  '土库曼斯坦': 'Turkmenistan',
  '东帝汶': 'Timor-Leste',
  '特里尼达和多巴哥': 'Trinidad and Tobago',
  '突尼斯': 'Tunisia',
  '土耳其': 'Turkey',
  '坦桑尼亚': 'Tanzania',
  '乌干达': 'Uganda',
  '乌克兰': 'Ukraine',
  '乌拉圭': 'Uruguay',
  '美国': 'United States',
  '乌兹别克斯坦': 'Uzbekistan',
  '委内瑞拉': 'Venezuela',
  '越南': 'Vietnam',
  '瓦努阿图': 'Vanuatu',
  '西岸': 'West Bank',
  '也门': 'Yemen',
  '南非': 'South Africa',
  '赞比亚': 'Zambia',
  '津巴布韦': 'Zimbabwe',
  '南海诸岛': '南海诸岛',
  '刚果': 'Congo',
  '刚果(金)': 'Dem. Rep. Congo',
  '库拉索': 'Curaçao',
  '佛得角': 'Cape Verde',
  '蒙特塞拉特岛': 'Montserrat',
  '关岛(美)': 'Guam',
  '巴林': 'Bahrain',
  '安道尔': "Principat d'Andorra",
  '科特迪瓦': "Côte d'Ivoire",
  '马耳他': "Repubblika ta' Malta",
  '留尼汪岛': 'La Réunion',
  '圣马力诺': 'Repubblica di San Marino',
  '毛里求斯': 'The Republic of Mauritius',
  '巴勒斯坦': 'Palestine',
  '马恩岛': 'Isle of Man',
  '马约特岛': 'Mayotte',
  '根西岛': 'Guernsey',
  '泽西岛(英)': 'Jersey',
  '法罗群岛(丹)': 'Faeroe Is.',
  '维尔京群岛(美)': 'U.S. Virgin Is.'
}
export const countryList2 = [
  '阿富汗',
  '新加坡',
  '安哥拉',
  '阿尔巴尼亚',
  '阿联酋',
  '阿根廷',
  '亚美尼亚',
  '法属南半球和南极领地',
  '澳大利亚',
  '奥地利',
  '阿塞拜疆',
  '布隆迪',
  '比利时',
  '贝宁',
  '布基纳法索',
  '孟加拉国',
  '保加利亚',
  '巴哈马',
  '波斯尼亚和黑塞哥维那',
  '白俄罗斯',
  '伯利兹',
  '百慕大',
  '玻利维亚',
  '巴西',
  '文莱',
  '不丹',
  '博茨瓦纳',
  '中非',
  '加拿大',
  '瑞士',
  '智利',
  '中国',
  '象牙海岸',
  '喀麦隆',
  '刚果民主共和国',
  '刚果共和国',
  '哥伦比亚',
  '哥斯达黎加',
  '古巴',
  '北塞浦路斯',
  '塞浦路斯',
  '捷克',
  '德国',
  '吉布提',
  '丹麦',
  '多米尼加共和国',
  '阿尔及利亚',
  '厄瓜多尔',
  '埃及',
  '厄立特里亚',
  '西班牙',
  '爱沙尼亚',
  '埃塞俄比亚',
  '芬兰',
  '斐济',
  '福克兰群岛',
  '法国',
  '加蓬',
  '英国',
  '格鲁吉亚',
  '加纳',
  '几内亚',
  '冈比亚',
  '几内亚比绍',
  '赤道几内亚',
  '希腊',
  '格陵兰岛',
  '危地马拉',
  '法属圭亚那',
  '圭亚那',
  '洪都拉斯',
  '克罗地亚',
  '海地',
  '匈牙利',
  '印度尼西亚',
  '印度',
  '爱尔兰',
  '伊朗',
  '伊拉克',
  '冰岛',
  '以色列',
  '意大利',
  '牙买加',
  '约旦',
  '日本',
  '哈萨克斯坦',
  '肯尼亚',
  '吉尔吉斯斯坦',
  '柬埔寨',
  '韩国',
  '科索沃',
  '科威特',
  '老挝',
  '黎巴嫩',
  '利比里亚',
  '利比亚',
  '斯里兰卡',
  '莱索托',
  '立陶宛',
  '卢森堡',
  '拉脱维亚',
  '摩洛哥',
  '摩尔多瓦',
  '马达加斯加',
  '墨西哥',
  '北马其顿',
  '马里',
  '缅甸',
  '黑山',
  '蒙古',
  '莫桑比克',
  '毛里塔尼亚',
  '马拉维',
  '马来西亚',
  '纳米比亚',
  '新喀里多尼亚',
  '尼日尔',
  '尼日利亚',
  '尼加拉瓜',
  '荷兰',
  '挪威',
  '尼泊尔',
  '新西兰',
  '阿曼',
  '巴基斯坦',
  '巴拿马',
  '秘鲁',
  '菲律宾',
  '巴布亚新几内亚',
  '波兰',
  '波多黎各(美)',
  '朝鲜',
  '葡萄牙',
  '巴拉圭',
  '卡塔尔',
  '罗马尼亚',
  '俄罗斯',
  '卢旺达',
  '西撒哈拉',
  '沙特阿拉伯',
  '苏丹',
  '南苏丹',
  '塞内加尔',
  '所罗门群岛',
  '塞拉利昂',
  '萨尔瓦多',
  '索马里兰',
  '索马里',
  '塞尔维亚',
  '苏里南',
  '斯洛伐克',
  '斯洛文尼亚',
  '瑞典',
  '斯威士兰',
  '叙利亚',
  '乍得',
  '多哥',
  '泰国',
  '塔吉克斯坦',
  '土库曼斯坦',
  '东帝汶',
  '特里尼达和多巴哥',
  '突尼斯',
  '土耳其',
  '坦桑尼亚',
  '乌干达',
  '乌克兰',
  '乌拉圭',
  '美国',
  '乌兹别克斯坦',
  '委内瑞拉',
  '越南',
  '瓦努阿图',
  '西岸',
  '也门',
  '南非',
  '赞比亚',
  '津巴布韦',
  '巴哈马', '南海诸岛',
  '刚果',
  '刚果(金)',
  '库拉索',
  '佛得角',
  '蒙特塞拉特岛',
  '关岛(美)',
  '巴林',
  '安道尔',
  '科特迪瓦',
  '马耳他',
  '留尼汪岛',
  '圣马力诺',
  '毛里求斯',
  '巴勒斯坦',
  '马恩岛',
  '马约特岛',
  '根西岛',
  '泽西岛(英)',
  '塞浦路斯',
  '法罗群岛(丹)',
  '维尔京群岛(美)',
  '几内亚比绍'
]
export function convertCN2EN (cname) {
  return countryList3[cname]
}
export function convertEN2CN (cname) {
  return countryList[cname]
}
