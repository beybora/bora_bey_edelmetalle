<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        $imageUrls = [
            "https://media.istockphoto.com/id/1264928464/de/foto/stapel-von-gl%C3%A4nzenden-goldbarren-3d-illustration.jpg?s=612x612&w=0&k=20&c=eRXegW23styj9pAAaIld2ZAWU8W7GdXU9-daTOvba6o=",
            "https://media.istockphoto.com/id/1409317389/de/foto/mehrere-verschiedene-goldbarren-liegen-auf-einem-haufen-goldpellets.jpg?s=612x612&w=0&k=20&c=buGn9_Z_8IEPWP4QgypWIxoBZVzAAK7s9dsaoZad8lc=",
            "https://media.istockphoto.com/id/175204950/de/foto/gold-und-silber-kantillen-m%C3%BCnzen.jpg?s=612x612&w=0&k=20&c=DZvWKKxHaUZWM8X346sjdpZTvl-aW64GkO0MLt5U4lw=",
            "https://media.istockphoto.com/id/2159638788/de/foto/gepr%C3%A4gter-goldbarren-mit-einem-gewicht-von-1000-gramm-auf-einem-abstrakten-metall.jpg?s=612x612&w=0&k=20&c=eiw2o2WaL-MLNVZ565GTEOq5YkMe6-U2O_BQQqDGEDI=",
            "https://media.istockphoto.com/id/137999691/de/foto/silberm%C3%BCnze-bar-und-lounge-bullion.jpg?s=612x612&w=0&k=20&c=7CmKG3SFlDJbL7_R2rGQGtOhtr-nOLO0fTuyc4bhSvE=",
            "https://media.istockphoto.com/id/1608037868/de/foto/goldbarren-und-verschiedene-anlagem%C3%BCnzen.jpg?s=612x612&w=0&k=20&c=526aq-JPgcKcFhTGIx8REgPY50NU5nuiihXicNYZXsk=",
            "https://media.istockphoto.com/id/1178101192/de/foto/schmuck-k%C3%A4ufer-pfandgesch%C3%A4ft-und-kaufen-und-verkaufen-edelmetalle-konzept-thema-mit-einem.jpg?s=612x612&w=0&k=20&c=ithDmVEjhaz5-97UKvBWEZeRcKBwTwKcLLSwU8VjE68=",
            "https://media.istockphoto.com/id/1735258020/de/foto/swiss-vreneli-gold-coins.jpg?s=612x612&w=0&k=20&c=EWNcniaUkbfg-6a8hrKcwQ__6chygnV-oZ2YordZjtk=",
            "https://media.istockphoto.com/id/1626972309/de/foto/diverse-europ%C3%A4ische-umlaufgoldm%C3%BCnzen-des-19-20-jahrhunderts-im-samtbeutel.jpg?s=612x612&w=0&k=20&c=yyQIzoBeVSShNxxbTY-OF8UNuLOh1vKWS3UG8_GuC9Q=",
            "https://media.istockphoto.com/id/493876988/de/foto/mischung-aus-silber-und-goldene-m%C3%BCnzen.jpg?s=612x612&w=0&k=20&c=8OBaPSqxzW2SdMCD2P7YW2XGOS9jUzLj9sjXz5IOaSE=",
            "https://media.istockphoto.com/id/90937123/de/foto/silver-bar-und-lounge-bullion.jpg?s=612x612&w=0&k=20&c=aMES78TJKrwUCGKoJFQ60jEuq-WjZQteY9dkPNWUqyc=",
            "https://media.istockphoto.com/id/90937120/de/foto/gold-und-silver-bar-und-lounge-bullion.jpg?s=612x612&w=0&k=20&c=HvTVD-UxF7VPU0LtHmk_dxDn4vEcv05mYNCTdq43-C8=",
            "https://media.istockphoto.com/id/1692447615/de/foto/%C3%B6sterreichische-25-und-100-schilling-goldm%C3%BCnzen.jpg?s=612x612&w=0&k=20&c=wDKUsub9NUOrAvCYc67t3NFLtC9Jjt2n3Ggu-aXC7TA=",
            "https://media.istockphoto.com/id/171574107/de/foto/isoliert-pure-gold-barren-auf-weiss-mit-clipping-path.jpg?s=612x612&w=0&k=20&c=h8ystnvtpOqt81iCW0iE9Io3BlZq11EH7_LeYCSzOiU=",
            "https://media.istockphoto.com/id/2202136192/de/foto/in-reihen-gestapelte-goldbarren-zeigen-immensen-reichtum-in-einer-sicheren-tresorumgebung.jpg?s=612x612&w=0&k=20&c=DJUL4Z429VxjTG_Jj-ega8E_-uGG0HmOhlfQwpaFMXw=",
            "https://media.istockphoto.com/id/2186390030/de/foto/close-up-of-wedding-rings.jpg?s=612x612&w=0&k=20&c=kSVBeerBM0ACvuFLsW466MY3FspA_8swUJVXv1o0cpI=",
            "https://media.istockphoto.com/id/1225738712/de/foto/platin-barren-stapel.jpg?s=612x612&w=0&k=20&c=bp2l2uR3ARBhQmLYawr1mV65z_JgfEmTfSjCoA1aR5E=",
        ];

        $imagesShuffled = collect($imageUrls)->shuffle()->all();

        Product::factory()
            ->count(20)
            ->make()
            ->each(function ($product, $index) use ($categories, $imagesShuffled) {
                $product->category_id = $categories->random()->id ?? null;

                $product->image = $imagesShuffled[$index % count($imagesShuffled)];

                $product->save();
            });
    }
}
