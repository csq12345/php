<h2><?php echo $title; ?></h2>

<?php
/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/5/15
 * Time: 17:17
 */
echo "content";
?>
<?php foreach ($news as $news_item): ?>
    <h3><?php echo $news_item["title"] ?> </h3>
    <div>
        <?php echo $news_item["text"] ?>
    </div>
    <p><a href="<?php echo "news/view/".$news_item["slug"] ?>">View article</a></p>
<?php endforeach ?>
