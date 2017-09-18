using NUnit.Framework;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using iList.Api;
using iList.Data.Providers;
using iList.Data.Models;
using iList.Models.Requests;

namespace iList.Tests.Controllers
{
    [TestFixture]
    public class ListItemControllerTests
    {
        private ListItemController _controller;
        private Mock<IListItemProvider> _mockListItemProvider;

        [SetUp]
        public void Setup()
        {
            _controller = new ListItemController();
            _mockListItemProvider = new Mock<IListItemProvider>();
            _controller.Provider = _mockListItemProvider.Object;
        }

        [Test]
        public async Task Get_all_should_call_GetListItems_and_return_what_comes_from_provider()
        {
            var id = Guid.NewGuid();

            _mockListItemProvider.Setup(p => p.GetListItems()).Returns(Task.FromResult(new List<ListItem>
            {
                new ListItem { Id = id, Text = "yay! text!" }
            }));

            var result = await _controller.GetAll();

            Assert.AreEqual(id, result.Items[0].Id);
            Assert.AreEqual("yay! text!", result.Items[0].Text);
            Assert.IsFalse(result.IsError);
            Assert.IsNull(result.Message);
        }

        [Test]
        public async Task Get_all_should_set_isError_to_true_and_message_to_exception_message_if_provider_throws_exception()
        {
            _mockListItemProvider.Setup(p => p.GetListItems()).Callback(() =>
            {
                throw new Exception("an exception!");
            });

            var result = await _controller.GetAll();

            Assert.IsEmpty(result.Items);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("an exception!", result.Message);
        }

        [Test]
        public async Task Get_should_call_GetListItem_and_return_what_comes_from_provider()
        {
            var id = Guid.NewGuid();

            _mockListItemProvider.Setup(p => p.GetListItemById(It.IsAny<Guid>()))
                .Returns(Task.FromResult(new ListItem { Id = id, Text = "yay! text!" }));

            var result = await _controller.Get(id);

            Assert.AreEqual(id, result.Item.Id);
            Assert.AreEqual("yay! text!", result.Item.Text);
            Assert.IsFalse(result.IsError);
            Assert.IsNull(result.Message);
        }

        [Test]
        public async Task Get_should_set_isError_to_true_and_message_to_exception_message_if_provider_throws_exception()
        {
            _mockListItemProvider.Setup(p => p.GetListItemById(It.IsAny<Guid>())).Callback(() =>
            {
                throw new Exception("an exception!");
            });

            var result = await _controller.Get(Guid.NewGuid());

            Assert.IsNull(result.Item);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("an exception!", result.Message);
        }

        [Test]
        public async Task Put_should_call_UpdateListItem_and_return_what_comes_from_provider()
        {
            var id = Guid.NewGuid();
            var id2 = Guid.NewGuid();

            _mockListItemProvider.Setup(p => p.UpdateListItem(It.IsAny<ListItem>()))
                .Returns(Task.FromResult(new ListItem { Id = id, Text = "yay! text!" }))
                .Callback<ListItem>(i =>
                {
                    Assert.AreEqual(id2, i.Id);
                    Assert.AreEqual("another text", i.Text);
                });

            var result = await _controller.Put(new UpdateListItemRequest
            {
                Item = new ListItem { Id = id2, Text = "another text" }
            });

            Assert.AreEqual(id, result.Item.Id);
            Assert.AreEqual("yay! text!", result.Item.Text);
            Assert.IsFalse(result.IsError);
            Assert.IsNull(result.Message);
        }

        [Test]
        public async Task Put_should_set_isError_to_true_and_message_to_exception_message_if_provider_throws_exception()
        {
            _mockListItemProvider.Setup(p => p.UpdateListItem(It.IsAny<ListItem>())).Callback(() =>
            {
                throw new Exception("an exception!");
            });

            var result = await _controller.Put(new UpdateListItemRequest());

            Assert.IsNull(result.Item);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("an exception!", result.Message);
        }

        [Test]
        public async Task Post_should_call_InsertListItem_and_return_what_comes_from_provider()
        {
            var id = Guid.NewGuid();

            _mockListItemProvider.Setup(p => p.InsertListItem(It.IsAny<string>()))
                .Returns(Task.FromResult(new ListItem { Id = id, Text = "yay! text!" }))
                .Callback<string>(i =>
                {
                    Assert.AreEqual("another text", i);
                });

            var result = await _controller.Post(new CreateListItemRequest
            {
                Text = "another text"
            });

            Assert.AreEqual(id, result.Item.Id);
            Assert.AreEqual("yay! text!", result.Item.Text);
            Assert.IsFalse(result.IsError);
            Assert.IsNull(result.Message);
        }

        [Test]
        public async Task Post_should_set_isError_to_true_and_message_to_exception_message_if_provider_throws_exception()
        {
            _mockListItemProvider.Setup(p => p.InsertListItem(It.IsAny<string>())).Callback(() =>
            {
                throw new Exception("an exception!");
            });

            var result = await _controller.Post(new CreateListItemRequest());

            Assert.IsNull(result.Item);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("an exception!", result.Message);
        }

        [Test]
        public async Task Delete_should_call_DeleteListItem_and_return_what_comes_from_provider()
        {
            var id = Guid.NewGuid();

            _mockListItemProvider.Setup(p => p.DeleteListItemById(It.IsAny<Guid>()))
                .Returns(Task.FromResult(true))
                .Callback<Guid>(i =>
                {
                    Assert.AreEqual(id, i);
                });

            var result = await _controller.Delete(id);

            Assert.IsTrue(result.IsSuccess);
            Assert.IsFalse(result.IsError);
            Assert.IsNull(result.Message);
        }

        [Test]
        public async Task Delete_should_set_isError_to_true_and_message_to_exception_message_if_provider_throws_exception()
        {
            _mockListItemProvider.Setup(p => p.DeleteListItemById(It.IsAny<Guid>())).Callback(() =>
            {
                throw new Exception("an exception!");
            });

            var result = await _controller.Delete(Guid.NewGuid());

            Assert.IsFalse(result.IsSuccess);
            Assert.IsTrue(result.IsError);
            Assert.AreEqual("an exception!", result.Message);
        }
    }
}
