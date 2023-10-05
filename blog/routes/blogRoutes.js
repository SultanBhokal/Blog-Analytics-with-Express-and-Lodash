import express from "express";
import { fetchBlog} from "../middleware/fetchBlogApi.js";
import { paramChecker } from "../middleware/paramChecker.js";
import { blogStats } from "../controllers/blogAnalysisController.js";
import { searchFilter } from "../controllers/blogSearchController.js";
import { getResultFromBlogStatCache,getResultFromSearchFilterCache } from "../middleware/getResultFromCache.js";

const router = express.Router();

router.route("/blog-stats").get(getResultFromBlogStatCache,fetchBlog,blogStats)
router.route("/blog-search").get(paramChecker('search'),getResultFromSearchFilterCache,fetchBlog,searchFilter)

export default router;