/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA .        *
 ***************************************************************************/
 
function init()
{
    comic.comicAuthor = "Richard Stevens 3";
    comic.firstIdentifier = "1";
    comic.websiteUrl = "http://www.dieselsweeties.com/";
    comic.curl = "";
    comic.ext = "png";
    //comic.title = "PvP";
    comic.requestPage(comic.websiteUrl, comic.User);
}
 
function pageRetrieved(id, data){
  
    var a,b,c,d,e;
    if(id==comic.User){
       var re = new RegExp("src=\"/hstrips/\\d/\\d/\\d/\\d/(\\d{5}).(\\S\\S\\S)");
       print(re);
       var match = re.exec(data);
       //print(match)
       if(match!=null){
	    //print(match[1]);
	    comic.lastIdentifier = match[1];
	    comic.ext=match[2];
	    //print(comic.lastIdentifier);
	    if(comic.identifier<10){
	       a="0";
	       b="0";
	       c="0";
	       d="0";
	       var re = new RegExp("(\\d)");
	       match=re.exec(comic.identifier.toString());
	       e=match[1];
	    }
	    if(comic.identifier>=10 && comic.identifier<100){
	       a="0";
	       b="0";
	       c="0";
	       var re = new RegExp("(\\d)(\\d)");
	       match=re.exec(comic.identifier.toString());
	       d=match[1];
	       e=match[2];
	    }
	    if(comic.identifier>=100 && comic.identifier<1000){
	       a="0";
	       b="0";
	       var re = new RegExp("(\\d)(\\d)(\\d)");
	       match=re.exec(comic.identifier.toString());
	       c=match[1];
	       d=match[2];
	       e=match[3];
	    }
	    if(comic.identifier>=1000 && comic.identifier<10000){
	       a="0";
	       var re = new RegExp("(\\d)(\\d)(\\d)(\\d)");
	       match=re.exec(comic.identifier.toString());
	       b=match[1];
	       c=match[2];
	       d=match[3];
	       e=match[4];
	       //print("aqui");
	    }
	    if(comic.identifier>=10000){
	       var re = new RegExp("(\\d)(\\d)(\\d)(\\d)(\\d)");
	       match=re.exec(comic.identifier.toString());
	       a=match[1];
	       b=match[2];
	       c=match[3];
	       d=match[4];
	       e=match[5];
	    }
	    comic.curl=comic.websiteUrl+"hstrips/"+a+"/"+b+"/"+c+"/"+d+"/"+a+b+c+d+e+"."+comic.ext;
	    print(comic.curl);
	    url="http://www.dieselsweeties.com/archive/"+comic.identifier
	    print(url);
	    //Esto solo es necesario para cargar el alttext.
	    comic.requestPage(url, comic.Page);
	    //comic.requestPage(url, comic.Image);
       }else{
	   comic.error();
       }       
    }
    if(id==comic.Page){
      //print("ERE");
       var re = new RegExp("img title=\"([^\"]*)\" src");
       var match = re.exec(data);
       comic.requestPage(comic.curl, comic.Image);
       //print(re);
       if(match!=null){
	 // print(match[1]+" || "+match[2]+"||");
	  comic.additionalText = match[1];
	  //comic.title = "Penny Arcade";
	 // comic.requestPage(match[1], comic.Image);
       }else{
	   //comic.error();
	   return;
       }
    }
}

