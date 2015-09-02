<?php

/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/5/15
 * Time: 15:58
 */
class News extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        //$this->load->model("news_model");
    }

    public function index()
    {
//        $data["news"] = $this->news_model->get_news();
//        $data['title'] = 'news archive';
//
//        $this->load->view('templates/header', $data);
//        $this->load->view('news/index', $data);
//        $this->load->view('templates/footer');
        echo "fsfas";
    }

//    public function view($slug = null)
//    {
//        $data["news_item"] = $this->news_model->get_news($slug);
//
//        if (empty($data['news_item']))
//        {
//            show_404();
//        }
//
//        $data['title'] = $data['news_item']['title'];
//
//        $this->load->view('templates/header', $data);
//        $this->load->view('news/view', $data);
//        $this->load->view('templates/footer');
//
//    }
}

?>