<?php

/**
 * Created by PhpStorm.
 * User: chensq
 * Date: 2015/5/15
 * Time: 10:34
 */
class Pages extends CI_Controller
{
    public function view($page = "home")
    {
        if (!file_exists(APPPATH . "/views/pages/" . $page . ".php")) {

            show_404();
        }
        $data["title"] = ucfirst($page);

        $obj=  $this->load;
        $this->load->view("templates/header", $data);
        $this->load->view("pages/" . $page, $data);

        $this->load ->view("templates/footer", $data);
    }
}