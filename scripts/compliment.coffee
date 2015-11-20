# Description:
#   The bot compliments sends compliments (pictures from the Daily Odd Copmliment)
#
# Dependencies: none
# Configurations: none
# Commands: 
# 		you look nice today - bot responds with a compliment
#		compliment <user> - bot compliments user


module.exports = (robot) ->

   compliments = ['http://40.media.tumblr.com/ca8aab958d5599f50cff7594bc7a4948/tumblr_ndet4w3myq1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/27d61f70623ece64ae685e7d18c30dbc/tumblr_ncsk3ucCsZ1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/7b3365b0dcf034ce3394b77074b2c3ee/tumblr_nbcpa57WQu1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/1ecb6c6fe35fe8c44d8e0d899a969d21/tumblr_n80as9abTy1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/b13418027be37fee149a4dd8d7fb214a/tumblr_n69df7wRgl1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/1ffffd41e984909aff7143c2d7b9c31e/tumblr_n3hdmkR73c1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/533e85368c28a4f0f00f51f6f10ad781/tumblr_mztvh5i4xc1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/048036026c0dfdd278c560d2445eb7a9/tumblr_mxrwn9n4bm1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/3b3e5e4ea777a2e0db20beabc424f905/tumblr_mxq1naBERU1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/2e503174d35de592b036082daf61bb02/tumblr_mxetpfFVdO1qkliv0o1_500.jpg',
				  'http://36.media.tumblr.com/d9f2b8f042ae5e356fefddf0e095de17/tumblr_mx9dkkFuEf1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/7239ab49bdc1e58ea5a22ec193973df9/tumblr_mv5c88Fl0U1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/1281e1c98526c9b49c8344d696a61db4/tumblr_mu4ceeyZnT1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/bcf1922e820ca5db60e61ba2789ce302/tumblr_mtt76i0vL51qkliv0o1_500.jpg',
				  'http://36.media.tumblr.com/4ef663e30b8a8f87ffe0045b1dae5c55/tumblr_mtanr6Bx9z1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/5e981219aca40f677e935bac6f42abbc/tumblr_mt1gz9zvMr1qkliv0o1_500.jpg',
				  'http://36.media.tumblr.com/2b551c17e6a6d361cca51512c9eeaa34/tumblr_msvx3pRZro1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/a0094744deb68d092ecd9323c0624c9b/tumblr_mrt0ceBgjM1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/22491d3dcaaea4cf074f48a84e515bf1/tumblr_mqq4902V2V1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/f054ff72de5b3868eacdabcb90b068f0/tumblr_mpp3baTLJJ1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/14a4b97104291bd3f725cab87895dd1c/tumblr_mp11d4e7lW1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/24c9b67f1079656bddb029e00daf9dbc/tumblr_mnufo2AvQj1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/df4d086366f373756652f7e231f8b24c/tumblr_mnl4rlwck01qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/45d121eb1162d86304d06b3e0a58b2eb/tumblr_mn6dtbz6f11qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/6897e6f68d8ec5b7fa2286357df27821/tumblr_mmeicoMdmL1qkliv0o1_500.jpg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/40295218120.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/40642609362.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/40562745808.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/37874263775.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/37678448367.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/37369900243.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/35814580445.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/34664421823.jpeg',
				  'http://www.pleated-jeans.com/wp-content/uploads/2013/01/34201999948.jpeg',
				  'http://40.media.tumblr.com/1ccf8519edf989ff118991bd70eb5d43/tumblr_mlw1f6ZWVe1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/879688f122133ffca9cfa5c0f8b76d20/tumblr_mlff2ztnOB1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/301114cda3b66b9a81299ac27294ecde/tumblr_mldht9c8EG1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/c47c4043cfff749996ec192835f0bc1f/tumblr_ml60c0MWGe1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/9543cb602788ec9586895038cb33f2e0/tumblr_mjq7fbZNLY1qkliv0o1_500.jpg',
				  'http://36.media.tumblr.com/8ce6f8d7f3417d36fabada9c774555b6/tumblr_mj9p7kT0z01qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/b078f0e26ea062c22a1f82943cfeb1b2/tumblr_mj5w8wKW9L1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/521991836acae71ccba7d4b263953dfa/tumblr_miwm02qG0Y1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/b18b5db3446074db4dc27bcd6733674e/tumblr_miszxhwSyZ1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/1c3f15ab5d92e6e167e3219bcbb44777/tumblr_mi31f38r751qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/2fcce66ad1af48ae397218e929d170bb/tumblr_mhxddwMIb71qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/638d23657350abcf9bd8335b1f7d20e4/tumblr_mh5p1u8Y4g1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/8e687dc9a5f326f7438c1c75f38f82c3/tumblr_mh3tb2muIM1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/698ead1543677cc3f59dc083629d8b60/tumblr_mg4gs9xq2c1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/0bd3279dda0d3b46edb46c1ece96a182/tumblr_mfq0s2dxZu1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/8ca24bb2468b2ceccd53d3f9544d5150/tumblr_mfcyu6j3PJ1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/70e01c88225429f4c92d0f9a12cf9e23/tumblr_mfavjvoRiX1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_md5bkzRlbf1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_md3cfxrr9A1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_mcbl73Bd6G1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_mc2dm6Espe1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_mbebfhxeKa1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_maoe0bpUcT1qkliv0o1_500.jpg',
				  'http://36.media.tumblr.com/tumblr_main43aOqh1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_ma9lmf5xRJ1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_ma7qgnN3la1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_m9jssoA1u71qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_m8tptbB3tq1qkliv0o1_500.jpg',
				  'http://40.media.tumblr.com/tumblr_m6z05fsTLU1qkliv0o1_500.jpg',
				  'http://41.media.tumblr.com/tumblr_m6n4bjrKlq1qkliv0o1_500.jpg']

   #Bot repsonds to a compliment with a compliment
   robot.respond /you look nice today/i, (msg) ->
     msg.reply msg.random compliments   

   #Bot compliments another user
   robot.respond /compliment (.*)/i, (msg) ->
     name = msg.match[1]
     msg.send name  + " " + msg.random compliments